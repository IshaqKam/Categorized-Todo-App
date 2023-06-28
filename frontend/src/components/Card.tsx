import { useEffect, useState, ChangeEvent } from 'react';
import { KeyboardArrowDown, Add } from '@mui/icons-material';
import {
  InputAdornment,
  IconButton,
  Collapse,
  CardContent,
  Card,
  Typography,
  Box,
  TextField,
  Checkbox,
} from '@mui/material';

import ExpandIconButton from './ExpandIconButton';
import { GetAllCategories } from '@/services/category';
import { UpdateSubtaskStatus } from '@/services/subTask';
import { AddTodo, UpdateTodoStatus } from '@/services/todo';
import { CategoryCard } from './CategoryCard';

const label = { inputProps: { 'aria-label': 'Todo checkbox' } };

export default function CardBox() {
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [title, setTitle] = useState('');

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
    await AddTodo({ categoryId, title });
    await getAllCategories();
    setTitle('');
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
        padding: '10px',
        overflowY: 'auto',
        borderTop: '10px solid black',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#e5e5e5',
      }}
    >
      {categories.map((category, index) => (
        <CategoryCard
          title={title}
          index={index}
          key={category._id}
          setTitle={setTitle}
          category={category}
          expandedIndex={expandedIndex}
          handleAddTask={handleAddTask}
          handleCheckBox={handleCheckBox}
          handleExpandClick={handleExpandClick}
        />
      ))}
    </Card>
  );
}
