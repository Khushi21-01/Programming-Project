import express from "express";
import cors from "cors";
import taskRoutes from "./Routes/taskRoutes.js";
import connectDB from "./config/database.js";
import boardRoutes from "./Routes/boardRoutes.js";

const app = express();

// Enhanced CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connectDB();

app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/board", boardRoutes);

const port = 3000;
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
