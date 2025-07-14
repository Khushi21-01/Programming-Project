import TaskModel from '../Models/Tasks.js';

export default class TaskController {
    // to get the tasks by its ID read operation
  async getTaskById(req, res) {
        const taskId  = req.params.taskId;
        try{
             const requestedtask = await TaskModel.getTaskById(taskId);
             if(!requestedtask) {
                return res.status(404).json({ message: "Task not found" });
             }
             res.status(200).json({message: "Task retrieved successfully", task: requestedtask}); 
             } catch (error){
                res.status(500).json({message: error.message});
            }
        }


    // Get tasks by section
    async getTasks(req, res) {
        const section = req.params;
        try {
            const tasks = await TaskModel.getTasksBySection(section);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Add a new task
 async addTask(req, res) {
        // const { name, description, dueDate, assignee, section } = req.body;
        try {
            const task = await TaskModel.addTask(req.body);

            if (!task) {
                return res.status(400).json({ message: "Failed to add task" });
            }
            const newtask= await task.save();
            
            res.status(201).json({ message: "Task added successfully", newtask});
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

 
    // Update a task
    async updateTask(req, res) {
        const taskId  = req.params.taskId;
        const updatedTask = req.body;

        try {
            const task = await TaskModel.updateTask(taskId, updatedTask);
            const ressave = await task.save();
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task updated successfully", ressave });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Move task to another section
 async moveTask(req, res) {
        const { taskId, sourceSectionId, destinationSectionId } = req.body;
        try {
            const task = await TaskModel.moveTask(taskId, sourceSectionId, destinationSectionId);
            res.status(200).json({ message: "Task moved successfully", task });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a task
 async deleteTask(req, res) {
        const { taskId } = req.params;

        try {
            await TaskModel.deleteTask(taskId);
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}