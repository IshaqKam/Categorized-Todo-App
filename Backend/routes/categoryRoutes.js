const express = require('express');
const {
  createCategory,
  getAllCategories,
  updateCategoryTitle,
  getCategoryById,
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').get(getCategoryById).patch(updateCategoryTitle);

module.exports = router;
