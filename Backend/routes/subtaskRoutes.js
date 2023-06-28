const express = require('express');
const router = express.Router();
const {
  updateSubTaskStatus,
  deleteSubTask,
  getSubTask,
  createSubTask,
  updateSubTaskTitle,
} = require('../controllers/subtaskController');

router.route('/').post(createSubTask);
router
  .route('/:id')
  .get(getSubTask)
  .patch(updateSubTaskStatus)
  .delete(deleteSubTask);
router.route('/:id/title').patch(updateSubTaskTitle);

module.exports = router;
