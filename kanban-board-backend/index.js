import express from 'express';
import cors from 'cors';
import taskRoutes from './Routes/taskroutes.js';


const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/tasks", taskRoutes);

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });