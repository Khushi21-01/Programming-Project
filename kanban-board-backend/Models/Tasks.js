const taskSchema = {
  title: { type: String, required: true },
    description: { type: String},
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date },
    progress: { type: Number, default: 0 },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true }
    };
    const Task = mongoose.model('Task', taskSchema);

export default class TaskModel {

    static async addTask({ title, description, dueDate, progress, section }) {
        try {
            const sectionDoc = await Section.findById(section);
            if (!sectionDoc) {
                throw new Error("Section does not exist");
            }
            const newTask = new Task({ title, description, dueDate, section: sectionDoc._id });

            
            sectionDoc.tasks.push(newTask._id);

            await sectionDoc.save(); 

            return await newTask.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getTasksBySection(section) {
        return await Task.find({ section });
    }

    static async updateTask(id, updatedTask) {
        try {
            const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
            if (!task) throw new Error("Task not found");
            return task;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }

    static async moveTask(taskId, sourceSectionId, destinationSectionId) {
        try {
            
            const sourceSection = await Section.findById(sourceSectionId);
            const destinationSection = await Section.findById(destinationSectionId);
            if (!sourceSection || !destinationSection) {
                throw new Error('Source or Destination section not found');
            }
    
           
            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }
    
            
            sourceSection.tasks = sourceSection.tasks.filter(id => id.toString() !== taskId.toString());
            await sourceSection.save();
    
           
            task.section = destinationSectionId;
            await task.save();
    
            
            destinationSection.tasks.push(task._id);
            await destinationSection.save();
    
       
            return await Task.findById(taskId).populate("section");
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
}