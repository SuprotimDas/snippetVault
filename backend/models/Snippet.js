const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Other']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['DSA', 'Frontend', 'Backend', 'Database', 'DevOps', 'System Design', 'Other']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Code block is required']
    },
    favorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Snippet', snippetSchema);