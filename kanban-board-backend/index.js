import express from 'express';
import cors from 'cors';
import taskRoutes from './Routes/taskRoutes.js';
import connectDB from './config/database.js';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

connectDB();

app.use(express.json());


app.get('/api/board', async (req, res) => {
  try {
    
    const boardData = {
      columns: [
        {
          _id: '1',
          title: 'To Do',
          tasks: []
        },
        {
          _id: '2',
          title: 'In Progress',
          tasks: []
        },
        {
          _id: '3',
          title: 'Done',
          tasks: []
        }
      ]
    };
    res.json(boardData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/tasks", taskRoutes);

const port = 3000;
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });