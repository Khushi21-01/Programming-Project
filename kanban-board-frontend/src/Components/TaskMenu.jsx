import React, { useContext, useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoardContext } from '../contexts/BoardContext';
import EditTaskDialog from './EditTaskDialog';

const TaskMenu = React.memo(({ anchorEl, onClose, task, columnId }) => {
  const { removeTask } = useContext(BoardContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setEditDialogOpen(true);
    onClose();
  };

  const handleDelete = () => {
    removeTask(task._id);
    onClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <EditTaskDialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        task={task} 
        columnId={columnId} 
      />
    </>
  );
});

export default TaskMenu;