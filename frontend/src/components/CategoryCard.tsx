import { Add, Folder, DateRange, KeyboardArrowDown } from '@mui/icons-material';
import {
  InputAdornment,
  IconButton,
  Collapse,
  CardContent,
  Typography,
  Box,
  TextField,
  Divider,
} from '@mui/material';

import ExpandIconButton from './ExpandIconButton';
import { Item } from './Item';

export function CategoryCard({
  title,
  index,
  subtask,
  setDate,
  category,
  setTitle,
  setSubtask,
  addTodoError,
  expandedIndex,
  handleAddTask,
  handleCheckBox,
  addSubtaskError,
  handleAddSubtask,
  handleExpandClick,
}: CategoryCardProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '5px',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '5px' }}>
            <Folder color="disabled" />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {category.name}
          </Typography>
        </Box>
        <Divider variant="fullWidth" sx={{ width: '30%' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginLeft: '5px', marginRight: '5px' }}>
            <ExpandIconButton
              expand={expandedIndex === index ? true : undefined}
              onClick={() => handleExpandClick(index)}
            >
              <KeyboardArrowDown />
            </ExpandIconButton>
          </Box>
          <Box
            sx={{
              backgroundColor: 'black',
              paddingX: '5px',
              borderRadius: '5px',
            }}
          >
            <Typography
              sx={{ color: 'white', fontWeight: '700' }}
              variant="body1"
            >
              {category.todos.length}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
        <CardContent>
          {category.todos.map((todo, todoIndex) => (
            <>
              <Item
                key={todoIndex}
                item={todo}
                handleCheckBox={handleCheckBox}
                todo={true}
              />
              {new Date(todo.due_date) < new Date() ? null : (
                <Box display="flex" alignItems="center" marginLeft={4}>
                  <DateRange fontSize="small" color="primary" />
                  <Typography
                    variant="body1"
                    color="primary"
                    marginLeft={0.5}
                    textAlign={'center'}
                    fontSize="10"
                  >
                    {`Due in ${Math.ceil(
                      (new Date(todo.due_date).getTime() -
                        new Date().getTime()) /
                        (24 * 60 * 60 * 1000)
                    )} days`}
                  </Typography>
                </Box>
              )}
              <Box sx={{ ml: 3, width: '60%' }}>
                {todo.subtasks.map((subtask, subTaskindex) => (
                  <>
                    <Item
                      key={subTaskindex}
                      item={subtask}
                      handleCheckBox={handleCheckBox}
                      todo={false}
                    />
                  </>
                ))}
                <div style={{ marginLeft: 10 }}>
                  <TextField
                    id="add-subtask"
                    label="Add sub task..."
                    type="text"
                    value={subtask}
                    variant="standard"
                    onChange={(e) => {
                      setSubtask(e.target.value);
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleAddSubtask(todo._id)}
                          >
                            <Add />
                          </IconButton>
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                  />
                  <label style={{ color: 'red', marginLeft: 15 }}>
                    {addSubtaskError}
                  </label>
                </div>
              </Box>
            </>
          ))}
          {category.todos.length === 0 && (
            <Typography
              variant="body2"
              sx={{ color: 'red', marginLeft: '20px', fontStyle: 'italic' }}
            >
              No todos available.
            </Typography>
          )}
        </CardContent>
        <Box sx={{ '& .MuiTextField-root': { ml: 5, width: '80%' } }}>
          <div>
            <TextField
              id="add-todo"
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
                    <input
                      type="date"
                      // min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setDate(e.currentTarget.value)}
                    />
                    <IconButton onClick={() => handleAddTask(category._id)}>
                      <Add />
                    </IconButton>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
            />
            <label style={{ color: 'red', marginLeft: 50 }}>
              {addTodoError}
            </label>
          </div>
        </Box>
      </Collapse>
    </Box>
  );
}
