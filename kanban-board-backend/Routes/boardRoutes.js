import express from "express";
import mongoose from "mongoose";
const router = express.Router();


const Task = mongoose.models.Task || mongoose.model("Task", new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  status: String,  // "todo", "in-progress", "done"
  columnId: String, // Reference to the column it belongs to
  createdAt: { type: Date, default: Date.now },
}));


router.get("/", async (req, res) => {
  try {
    const [todoTasks, inProgressTasks, doneTasks] = await Promise.all([
      Task.find({ status: "todo" }),
      Task.find({ status: "in-progress" }),
      Task.find({ status: "done" })
    ]);

    res.json({
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
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/", async (req, res) => {
  try {
    const { columns } = req.body;
    
    if (!columns) {
      return res.status(400).json({ error: "Missing columns data" });
    }

    // Process all task updates in a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Flatten all tasks from all columns
      const allTasks = columns.flatMap(col => col.tasks);
      
      // Bulk update all tasks
      const bulkOps = allTasks.map(task => ({
        updateOne: {
          filter: { _id: task._id },
          update: { $set: { status: this.getStatusFromColumnId(task.columnId) } },
          upsert: true
        }
      }));

      await Task.bulkWrite(bulkOps, { session });
      await session.commitTransaction();
      
      res.json({ success: true });
    } catch (transactionErr) {
      await session.abortTransaction();
      throw transactionErr;
    } finally {
      session.endSession();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to map column _id to status
function getStatusFromColumnId(columnId) {
  const statusMap = {
    "1": "todo",
    "2": "in-progress",
    "3": "done"
  };
  return statusMap[columnId] || "todo";
}

export default router;