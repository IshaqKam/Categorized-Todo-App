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

const label = { inputProps: { 'aria-label': 'Todo checkbox' } };

export function CategoryCard({
  title,
  index,
  category,
  setTitle,
  expandedIndex,
  handleAddTask,
  handleCheckBox,
  handleExpandClick,
}: CategoryCardProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0px 0px -10px 0px',
        }}
      >
        <>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {category.name}
          </Typography>
          <Typography variant="h6">
            <ExpandIconButton
              expand={expandedIndex === index}
              onClick={() => handleExpandClick(index)}
              aria-expanded={expandedIndex === index}
              aria-label="show more"
            >
              <KeyboardArrowDown />
            </ExpandIconButton>
          </Typography>
        </>
      </Box>
      <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
        <CardContent>
          {category.todos.map((todo) => (
            <>
              <Box sx={{ display: 'flex', marginLeft: '15px' }}>
                <Box>
                  <Checkbox
                    checked={todo.completed}
                    onChange={(e) => handleCheckBox(e, todo._id, true)}
                    {...label}
                  />
                </Box>
                <Typography
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {todo.title}
                </Typography>
              </Box>
              {todo.subtasks.map((subtask, index) => (
                <>
                  <Typography
                    key={index}
                    sx={{ display: 'flex', marginLeft: '45px' }}
                  >
                    <Typography>
                      <Checkbox
                        checked={subtask.completed}
                        {...label}
                        onChange={(e) => handleCheckBox(e, subtask._id, false)}
                      />
                    </Typography>
                    <Typography
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  </Typography>
                </>
              ))}
            </>
          ))}
          {category.todos.length === 0 && (
            <Typography
              variant="body2"
              sx={{
                color: 'red',
                marginLeft: '20px',
                fontStyle: 'italic',
              }}
            >
              No todos available.
            </Typography>
          )}
        </CardContent>
        <Box
          sx={{
            '& .MuiTextField-root': { ml: 5, width: '80%' },
          }}
        >
          <div>
            <TextField
              id="standard-search"
              label="Write a task..."
              type="text"
              value={title}
              variant="standard"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleAddTask(category._id)}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
          </div>
        </Box>
      </Collapse>
    </>
  );
}
