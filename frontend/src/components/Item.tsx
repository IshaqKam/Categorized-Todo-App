import { Box, Checkbox, Typography } from '@mui/material';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Item checkbox' } };

export function Item({ item, handleCheckBox, todo }: ItemProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <Checkbox
          checked={item.completed}
          disabled={item.completed}
          onChange={(e) => handleCheckBox(e, item._id, todo)}
          sx={{
            '& .MuiSvgIcon-root': {
              stroke:
                new Date(item.due_date) < new Date() ? 'red' : 'currentColor',
              strokeWidth: 1.5,
            },
          }}
          {...label}
        />
      </Box>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: item.completed ? 'line-through' : '',
          color: item.completed ? '#616161' : '#111',
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );
}
