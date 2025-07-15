import express from "express";
import TaskModel from "../Models/Tasks.js";

const boardRoute = express.Router();

import mongoose from "mongoose";
const Task = mongoose.models.Task || mongoose.model("Task");

boardRoute.get("/", async (req, res) => {
  try {
    // Fetch tasks by status
    const todoTasks = await Task.find({ status: "todo" });
    const inProgressTasks = await Task.find({ status: "in-progress" });
    const doneTasks = await Task.find({ status: "done" });

    const boardData = {
      columns: [
        {
          _id: "1",
          title: "To Do",
          tasks: todoTasks,
        },
        {
          _id: "2",
          title: "In Progress",
          tasks: inProgressTasks,
        },
        {
          _id: "3",
          title: "Done",
          tasks: doneTasks,
        },
      ],
    };
    res.json(boardData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default boardRoute;
