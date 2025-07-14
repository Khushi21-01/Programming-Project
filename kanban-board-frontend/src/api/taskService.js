const API_URL = 'http://localhost:3000/api';

export const createTask = async (columnId, taskData) => {
  const response = await fetch(`${API_URL}/columns/${columnId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return await response.json();
};

export const updateTask = async (taskId, updatedData) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  return await response.json();
};