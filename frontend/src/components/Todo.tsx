import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CardBox from './card';

const CategorizedTodoListPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Categorized Todo List
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}
      >
        <CardBox />
      </Box>
    </Container>
  );
};

export default CategorizedTodoListPage;
