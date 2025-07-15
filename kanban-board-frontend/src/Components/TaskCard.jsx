import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskMenu from './TaskMenu';

const TaskCard = React.memo(({ task, index, columnId }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ 
            mb: 2,
            '&:hover': {
              boxShadow: 3
            }
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="h6" noWrap>{task.title}</Typography>
                {task.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {task.description}
                  </Typography>
                )}
              </Box>
              <IconButton 
                size="small" 
                onClick={handleMenuOpen}
                aria-label="task actions"
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </CardContent>

          <TaskMenu 
            anchorEl={anchorEl} 
            onClose={handleMenuClose} 
            task={task} 
            columnId={columnId} 
          />
        </Card>
      )}
    </Draggable>
  );
});

export default TaskCard;