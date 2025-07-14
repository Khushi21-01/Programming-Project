import React, { createContext, useState, useEffect } from 'react';
import { fetchBoard, updateBoard } from '../api/boardService';
import { createTask, updateTask, deleteTask } from '../api/taskService';

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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