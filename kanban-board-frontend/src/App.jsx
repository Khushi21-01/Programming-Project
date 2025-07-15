import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { BoardProvider } from "./contexts/BoardContext";
import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <>
      <BoardProvider>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kanban Board
            </Typography>
          </Toolbar>
        </AppBar>
        <BoardPage />
      </BoardProvider>
    </>
  );
}

export default App;
