'use client';

import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  file: z.any().optional(),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      file: undefined,
    },
  });

  const [uploadProgress, setUploadProgress] = useState(0); // 0..100
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const unsignedPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

  // Convert Cloudinary response to your Posts model media object
  function mapCloudinaryToMedia(cloudRes) {
    // cloudRes.resource_type: 'image' | 'video' | 'raw'
    let type = 'image';
    if (cloudRes.resource_type === 'video') type = 'video';
    else if (cloudRes.resource_type === 'raw' && cloudRes.format === 'pdf')
      type = 'pdf';
    else if (cloudRes.resource_type === 'image') type = 'image';

    let thumbnailUrl = null;
    if (type === 'video') {
      // generate video thumbnail (first frame) using Cloudinary transformation
      thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto:low,f_auto/${cloudRes.public_id}.jpg`;
    } else if (type === 'image') {
      thumbnailUrl = cloudRes.secure_url;
    } else if (type === 'pdf') {
      thumbnailUrl = cloudRes.secure_url; // fallback - you can generate a preview if configured
    }

    return {
      id: cloudRes.public_id,
      type,
      url: cloudRes.secure_url,
      thumbnailUrl,
      size: cloudRes.bytes || 0,
    };
  }

  // Upload a single file to Cloudinary (unsigned) and get JSON response
  function uploadToCloudinary(file) {
    return new Promise((resolve, reject) => {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', unsignedPreset);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) resolve(res);
          else reject(res);
        } catch (err) {
          reject(err);
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });
  }

  async function onSubmit(values) {
    // values.file is a File object or undefined
    const { title, description, file } = values;

    // client-side guard (zod ensures required fields)
    if (!title || !description) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      let mediaArray = [];

      if (file) {
        // optional: show local preview
        try {
          const reader = new FileReader();
          reader.onload = () => setPreviewUrl(reader.result);
          reader.readAsDataURL(file);
        } catch (e) {
          // ignore preview errors
        }

        // upload file to Cloudinary
        const cloudRes = await uploadToCloudinary(file);
        const mediaObj = mapCloudinaryToMedia(cloudRes);
        mediaArray.push(mediaObj);
      }

      // Build payload for your Posts model
      const payload = {
        courseTitle: title,
        courseDescription: description,
        authorId: null, // set it if you have auth
        media: mediaArray,
        visibility: 'public',
      };

      // send to App Router API route that creates the post
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error('Create post failed', json);
        throw new Error(json.message || 'Failed to create post');
      }

      // success
      // alert('Post created! id: ' + json._id);
      toast.success('Post created!');
      form.reset();
      setPreviewUrl(null);
      setUploadProgress(0);
    } catch (err) {
      console.error(err);
      alert('Error: ' + (err.message || JSON.stringify(err)));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 py-8">
      <div className="text-center text-2xl font-bold mb-8">Create Post</div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of the post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of the post"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media (PDF, Video, Image)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        onChange={(e) => {
                          field.onChange(e.target.files?.[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </Form>

          {/* Preview + progress */}
          {previewUrl && (
            <div className="mt-4">
              <div className="font-medium mb-2">Preview</div>
              <img
                src={previewUrl}
                alt="preview"
                className="max-w-full max-h-48 object-contain rounded"
              />
            </div>
          )}

          {uploading && (
            <div className="mt-4">
              <div>Upload progress: {uploadProgress}%</div>
              <progress value={uploadProgress} max="100" className="w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
