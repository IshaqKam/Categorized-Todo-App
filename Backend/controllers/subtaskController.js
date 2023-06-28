const asyncHandler = require('express-async-handler');
const SubTask = require('../models/subtask.model');
const Todo = require('../models/todo.model');

const createSubTask = asyncHandler(async (req, res) => {
  const { title, todoId } = req.body;
  if (!title || !todoId) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  try {
    // Create the subTask item
    const subTask = await SubTask.create({
      title,
      todo: todoId,
    });

    await Todo.findByIdAndUpdate(todoId, {
      $push: { subtasks: subTask._id },
    });

    res.status(201).json({ success: true, data: subTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

const getSubTask = asyncHandler(async (req, res) => {
  const subTask = await SubTask.findById(req.params.id);
  if (!subTask) {
    res.status(404);
    throw new Error('subTask not found');
  }
  res.status(200).json(subTask);
});

const updateSubTaskStatus = asyncHandler(async (req, res) => {
  const { completed } = req.body;
  const subTask = await SubTask.findById(req.params.id);
  if (!subTask) {
    res.status(404);
    throw new Error('SubTask not found');
  }

  const updatedSubTask = await SubTask.findByIdAndUpdate(
    req.params.id,
    { $set: { completed } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedSubTask);
});

const updateSubTaskTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const subTask = await SubTask.findById(req.params.id);
  if (!subTask) {
    res.status(404);
    throw new Error('SubTask not found');
  }

  const updatedSubTask = await SubTask.findByIdAndUpdate(
    req.params.id,
    { $set: { title } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedSubTask);
});

const deleteSubTask = asyncHandler(async (req, res) => {
  const subTask = await SubTask.findById(req.params.id);
  if (!subTask) {
    res.status(404);
    throw new Error('subTask not found');
  }

  await SubTask.deleteOne({ _id: req.params.id });
  res.status(200).json('SubTask deleted Successfully');
});

module.exports = {
  getSubTask,
  createSubTask,
  updateSubTaskStatus,
  deleteSubTask,
  updateSubTaskTitle,
};
