import { Box, Checkbox, Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Item checkbox' } };

export function Item({ item, handleCheckBox, todo }: ItemProps) {
  return (
    <Box sx={{ display: 'flex', marginLeft: '15px' }}>
      <Box>
        <Checkbox
          checked={item.completed}
          onChange={(e) => handleCheckBox(e, item._id, todo)}
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
        {item.title}
      </Typography>
    </Box>
  );
}
