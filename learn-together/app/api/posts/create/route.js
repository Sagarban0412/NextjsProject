import { connectDB } from '@/utils/db'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Post from '@/models/postModel'

export async function POST(req) {
  try {
    await connectDB()
    
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { courseTitle, courseDescription, media, visibility = 'public', imgUrl, authorName } = body
    
    // console.log('Received payload:', body)

    if (!courseTitle || !courseDescription) {
      return NextResponse.json({ 
        error: 'Title and description are required' 
      }, { status: 400 })
    }

    // Create post object
    const postData = {
      courseTitle,
      courseDescription,
      authorId: userId,
      imgUrl: imgUrl || null,
      authorName: authorName || 'Unknown',
      media: media || [],
      visibility,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Save to MongoDB
    const savedPost = await Post.create(postData)
    
    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      _id: savedPost._id,
      ...savedPost.toObject()
    }, { status: 201 })

  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ 
      error: 'Failed to create post',
      message: error.message 
    }, { status: 500 })
  }
}