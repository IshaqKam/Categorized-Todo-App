const express = require('express');
const router = express.Router();
const {
  getTodo,
  deleteTodo,
  createTodo,
  updateTodoTitle,
  updateTodoStatus,
  getTodosByCategoryId,
} = require('../controllers/todoController');

router.route('/').post(createTodo);
router.route('/category').get(getTodosByCategoryId);
router.route('/:id').get(getTodo).patch(updateTodoStatus).delete(deleteTodo);

router.route('/:id/title').patch(updateTodoTitle);

module.exports = router;
