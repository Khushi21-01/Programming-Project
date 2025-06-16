const taskSchema = {
  title: { type: String, required: true },
    description: { type: String},
    status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date },
    progress: { type: Number, default: 0 }
    };
    