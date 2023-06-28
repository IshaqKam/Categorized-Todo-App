const mongoose = require('mongoose');

const subTaskSchema = mongoose.Schema(
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
    todo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SubTask', subTaskSchema);
