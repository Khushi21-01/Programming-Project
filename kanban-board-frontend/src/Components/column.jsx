import React from 'react';
import { Box, Typography } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';

const Column = React.memo(({ column }) => {
  return (
    <Box sx={{ 
      minWidth: 300, 
      bgcolor: '#f5f5f5', 
      p: 2, 
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 180px)',
      //overflowY: 'auto'
    }}>
      <Typography variant="h6" sx={{ mb: 2, position: 'sticky', top: 0, bgcolor: '#f5f5f5', zIndex: 1 }}>
        {column.title} ({column.tasks.length})
      </Typography>

      <Droppable droppableId={column._id}>
        {(provided) => (
          <Box 
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ flexGrow: 1 }}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} columnId={column._id} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      <Box sx={{ position: 'sticky', bottom: 0, bgcolor: '#f5f5f5', pt: 2 }}>
        <AddTaskForm columnId={column._id} />
      </Box>
    </Box>
  );
});

export default Column;