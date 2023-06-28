const asyncHandler = require('express-async-handler');
const Category = require('../models/category.model');

const getAllCategories = asyncHandler(async (req, res) => {
  const today = new Date();
  const categories = await Category.find()
    .populate('todos')
    .populate({
      path: 'todos',
      populate: {
        path: 'subtasks',
      },
    });
  res.status(200).json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('All fields are mandatory!');
  }
  try {
    const todo = await Category.create({
      name,
    });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error('category not found');
  }
  res.status(200).json(category);
});

const updateCategoryTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  const categoryww = await Category.findByIdAndUpdate(
    req.params.id,
    { $set: { name: title } },
    {
      new: true,
    }
  );

  res.status(200).json('Category Updated Successfully');
});

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryTitle,
  getCategoryById,
};
