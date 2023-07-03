const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    subtasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTask',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Todo', todoSchema);
