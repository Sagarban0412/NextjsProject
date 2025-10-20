"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// shadcn components - adjust import paths to your project structure
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Zod schema for title, description and a single media file
const mediaFileTypes = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "video/mp4",
  "application/pdf",
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(150, "Title is too long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(2000),
  media: z
    .any()
    .refine((file) => file instanceof File, "A media file is required")
    .refine(
      (file) => mediaFileTypes.includes(file.type),
      "Unsupported file type"
    )
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      "File size must be 10MB or less"
    ),
});

export default function MediaForm() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      media: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    // cleanup preview URL on unmount
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function onSubmit(values) {
    // Create FormData if you want to send to an API
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("description", values.description);
    fd.append("media", values.media);

    // Replace with your upload request. Example below is commented out:
    // await fetch('/api/upload', { method: 'POST', body: fd });

    console.log("Form values:", values);
    alert("Submitted — check console. (Replace with actual upload logic.)");
    reset();
    setPreviewUrl(null);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-6"
      >
        {/* Title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media file */}
        <Controller
          control={control}
          name="media"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Media (image, video, or PDF)</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept="image/*,video/mp4,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    if (file) {
                      // create preview for images/videos
                      if (
                        file.type.startsWith("image/") ||
                        file.type.startsWith("video/")
                      ) {
                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                      } else {
                        setPreviewUrl(null);
                      }
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                />
              </FormControl>
              {fieldState.error ? (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              ) : null}

              {/* Preview (image or video) */}
              {previewUrl && (
                <div className="mt-3">
                  {field.value?.type &&
                  field.value.type.startsWith("image/") ? (
                    // image preview
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="max-h-60 rounded-md"
                    />
                  ) : (
                    // video preview
                    <video
                      src={previewUrl}
                      controls
                      className="max-h-60 rounded-md"
                    />
                  )}
                </div>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Upload"}
        </Button>
      </form>
    </Form>
  );
}
