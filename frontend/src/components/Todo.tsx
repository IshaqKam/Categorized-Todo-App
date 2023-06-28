import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CardBox from './Card';

const CategorizedTodoListPage = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" component="h1" gutterBottom>
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
