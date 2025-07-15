export const createTask = async (sectionId, taskData) => {
  const response = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...taskData, section: sectionId })
  });
  if (!response.ok) throw new Error('Failed to create task');
  return await response.json();
};

export const getTasksBySection = async (sectionId) => {
  const response = await fetch(`http://localhost:3000/api/tasks/${sectionId}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
};

export const updateTask = async (taskId, updates) => {
  const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return await response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return true;
};