import React, { useState, useContext } from 'react';
import { Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { BoardContext } from '../contexts/BoardContext';

const AddTaskForm = React.memo(({ columnId }) => {
  const [taskData, setTaskData] = useState({ title: '', description: '' });
  const { addTask } = useContext(BoardContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate title before adding
    if(!taskData?.title.trim()) {
      alert('Task title is required');  
      return;
    }

    if(!taskData?.description.trim()) {
      alert('Task description is required');  
      return;
    }

    if (taskData.title.trim()) {
      addTask(columnId, taskData);
      setTaskData({ title: '', description: '' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        size="small"
        placeholder="Task title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        sx={{ mb: 1 }}
        required
      />
      <TextField
        fullWidth
        size="small"
        placeholder="Description (optional)"
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        sx={{ mb: 1 }}
        multiline
        rows={2}
      />
      <Button
        type="submit"
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        disabled={!taskData.title.trim()}
        fullWidth
      >
        Add Task
      </Button>
    </Box>
  );
});

export default AddTaskForm;