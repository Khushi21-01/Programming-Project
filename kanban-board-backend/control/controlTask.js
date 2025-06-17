const task = require('../model/task');

const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
};
const createTask = async (req, res) => {
    try{
        const {
            title,
            description,
            status,
            priority,
            dueDate,
            progress
        } = req.body;
        res.status(201).json( {message: "Task created successfully", task: {}})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTask = async (req, res) => {
  try {
    const updatedTask = await task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTask = async (req, res) => {

    try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};