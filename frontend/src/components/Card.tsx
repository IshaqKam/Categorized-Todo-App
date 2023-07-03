import { useEffect, useState, ChangeEvent } from 'react';
import {
  Card,
  InputAdornment,
  IconButton,
  TextField,
  Box,
} from '@mui/material';

import { AddCategory, GetAllCategories } from '@/services/category';
import { AddSubtask, UpdateSubtaskStatus } from '@/services/subTask';
import { AddTodo, UpdateTodoStatus } from '@/services/todo';
import { CategoryCard } from './CategoryCard';
import { Add } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Todo checkbox' } };

export default function CardBox() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [subtask, setSubtask] = useState('');
  const [category, setCategory] = useState('');
  const [addTodoError, setAddTodoError] = useState('');
  const [addCategoryError, setAddCategoryError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [addSubtaskError, setAddSubtaskError] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleExpandClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  const getAllCategories = async () => {
    try {
      const data = await GetAllCategories();
      setCategories(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleAddTask = async (categoryId: string) => {
    if (!title) {
      setAddTodoError('You need to write a todo');
    } else if (!date) {
      setAddTodoError('You need to set due date');
    } else {
      await AddTodo({ categoryId, title, due_date: String(date) });
      await getAllCategories();
      setTitle('');
      setDate(null);
      setAddTodoError('');
    }
  };

  const handleAddSubtask = async (todoId: string) => {
    if (!subtask) {
      setAddSubtaskError('Subtask required');
    } else {
      await AddSubtask({ todoId, title: subtask });
      await getAllCategories();
      setSubtask('');
      setAddSubtaskError('');
    }
  };

  const handleAddCategory = async () => {
    if (!category) {
      setAddCategoryError('Category is required');
    } else {
      await AddCategory({ name: category });
      await getAllCategories();
      setCategory('');
      setAddCategoryError('');
    }
  };

  const handleCheckBox = async (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    todo: boolean
  ) => {
    const completed = e.currentTarget.checked;
    todo
      ? await UpdateTodoStatus({ todoId: id, completed })
      : await UpdateSubtaskStatus({ subtaskId: id, completed });

    await getAllCategories();
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 450,
        height: 450,
        width: 345,
        display: 'flex',
        padding: '10px',
        overflowY: 'auto',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '12px',
          background: 'black',
          borderRadius: '0 0 50% 50%',
        },
        backgroundColor: '#F4F4F4',
      }}
    >
      <Box sx={{ '& .MuiTextField-root': { ml: 5, width: '80%', mt: 1 } }}>
        <div>
          <TextField
            label="Add Category"
            type="text"
            value={category}
            variant="standard"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAddCategory}>
                    <Add />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <label style={{ color: 'red', marginLeft: 40 }}>
            {addCategoryError}
          </label>
        </div>
      </Box>
      <div>
        {categories.map((category, index) => (
          <CategoryCard
            title={title}
            index={index}
            setDate={setDate}
            subtask={subtask}
            key={category._id}
            setTitle={setTitle}
            category={category}
            setSubtask={setSubtask}
            addTodoError={addTodoError}
            expandedIndex={expandedIndex}
            handleAddTask={handleAddTask}
            handleCheckBox={handleCheckBox}
            addSubtaskError={addSubtaskError}
            handleAddSubtask={handleAddSubtask}
            handleExpandClick={handleExpandClick}
          />
        ))}
      </div>
    </Card>
  );
}
