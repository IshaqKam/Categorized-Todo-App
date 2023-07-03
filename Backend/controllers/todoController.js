const asyncHandler = require('express-async-handler');
const Todo = require('../models/todo.model');
const Category = require('../models/category.model');
const Subtask = require('../models/subtask.model');

const getTodosByCategoryId = asyncHandler(async (req, res) => {
  const { categoryId } = req.body;
  if (!categoryId) {
    res.status(400);
    throw new Error('Category Id is required!');
  }
  try {
    const todos = await Todo.find({
      category: categoryId,
    }).populate('subtasks');
    res.status(200).json(todos);
  } catch (e) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

const createTodo = asyncHandler(async (req, res) => {
  const { title, categoryId, due_date } = req.body;
  if (!title || !categoryId || !due_date) {
    res.status(400);
    throw new Error('All fields are mandatory !');
  }
  try {
    // Create the todo item
    const todo = await Todo.create({
      title,
      due_date,
      category: categoryId,
    });

    await Category.findByIdAndUpdate(categoryId, {
      $push: { todos: todo._id },
    });

    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('todo not found');
  }
  res.status(200).json(todo);
});

const updateTodoStatus = asyncHandler(async (req, res) => {
  const { completed } = req.body;
  const todo = await Todo.findById(req.params.id).populate('subtasks');

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: { completed } },
    {
      new: true,
    }
  );
  if (updatedTodo) {
    await Subtask.updateMany(
      { _id: { $in: todo.subtasks } },
      { $set: { completed } }
    );
  }

  res.status(200).json('Todo Updated Successfully');
});

const updateTodoTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }

  await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: { title } },
    {
      new: true,
    }
  );

  res.status(200).json('Todo Updated Successfully');
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404);
    throw new Error('todo not found');
  }

  await Todo.deleteOne({ _id: req.params.id });
  await Subtask.deleteMany({ _id: { $in: todo.subtasks } });
  res.status(200).json('Todo deleted Successfully');
});

module.exports = {
  getTodo,
  createTodo,
  deleteTodo,
  updateTodoTitle,
  updateTodoStatus,
  getTodosByCategoryId,
};
