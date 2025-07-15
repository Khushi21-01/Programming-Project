import React, { createContext, useState, useEffect } from 'react';
import { fetchBoard, updateBoard } from '../api/boardService';
import { createTask, updateTask, deleteTask } from '../api/taskService';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial board data
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await fetchBoard();
        setBoard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBoard();
  }, []);

  // Handle drag and drop
  const handleDragEnd = async (result) => {
    if (!board) return;

    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColIndex = board.columns.findIndex(col => col._id === source.droppableId);
    const finishColIndex = board.columns.findIndex(col => col._id === destination.droppableId);
    const startCol = board.columns[startColIndex];
    const finishCol = board.columns[finishColIndex];

    // Moving within same column
    if (startCol === finishCol) {
      const newTasks = [...startCol.tasks];
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      const newColumns = [...board.columns];
      newColumns[startColIndex] = { ...startCol, tasks: newTasks };

      try {
        const updatedBoard = { ...board, columns: newColumns };
        await updateBoard(updatedBoard);
        setBoard(updatedBoard);
      } catch (err) {
        setError(err.message);
      }
      return;
    }

    // Moving between columns
    const startTasks = [...startCol.tasks];
    const [movedTask] = startTasks.splice(source.index, 1);
    const finishTasks = [...finishCol.tasks];
    finishTasks.splice(destination.index, 0, movedTask);

    const newColumns = [...board.columns];
    newColumns[startColIndex] = { ...startCol, tasks: startTasks };
    newColumns[finishColIndex] = { ...finishCol, tasks: finishTasks };

    try {
      const updatedBoard = { ...board, columns: newColumns };
      await updateBoard(updatedBoard);
      setBoard(updatedBoard);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new task
  const addTask = async (columnId, taskData) => {
    try {
      const newTask = await createTask(columnId, taskData);
      const updatedColumns = board.columns.map(column => {
        if (column._id === columnId) {
          return { ...column, tasks: [...column.tasks, newTask] };
        }
        return column;
      });
      const updatedBoard = { ...board, columns: updatedColumns };
      setBoard(updatedBoard);
      await updateBoard(updatedBoard);
    } catch (err) {
      setError(err.message);
    }
  };

  // Edit task
  const editTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      const updatedColumns = board.columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => 
          task._id === taskId ? updatedTask : task
        )
      }));
      const updatedBoard = { ...board, columns: updatedColumns };
      setBoard(updatedBoard);
      await updateBoard(updatedBoard);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
   const removeTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedColumns = board.columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task._id !== taskId)
      }));
      const updatedBoard = { ...board, columns: updatedColumns };
      setBoard(updatedBoard);
      await updateBoard(updatedBoard);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!board) return <div>No board data</div>;

  return (
    <BoardContext.Provider value={{ board, handleDragEnd, addTask, editTask, removeTask }}>
      {children}
    </BoardContext.Provider>
  );
};
export { BoardContext };