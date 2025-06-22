import express from 'express';
import cors from 'cors';
import taskRoutes from './Routes/taskRoutes.js';
import connectDB from './config/database.js';


const app = express();

app.use(cors());

connectDB(); // Connect to MongoDB

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Kanban Board API');
});

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });