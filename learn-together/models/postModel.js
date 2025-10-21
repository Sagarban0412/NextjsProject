import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'video', 'pdf'],
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  size: {
    type: Number,
    default: 0
  }
})

const postSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
    maxLength: 2000
  },
  authorId: {
    type: String,
    required: true
  },
  media: [mediaSchema],
  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    userId: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
export default Post