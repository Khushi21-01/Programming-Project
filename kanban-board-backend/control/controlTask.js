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
const updateTask = async (req, res) => {};
const deleteTask = async (req, res) => {};