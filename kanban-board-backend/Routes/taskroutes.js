import{getTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus} from '..\control\controlTask.js';
const express = require('express');


const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/:id/status',  updateTaskStatus);
