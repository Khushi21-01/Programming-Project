import React, { useContext } from "react";
import { Box, Button } from "@mui/material";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../Components/column";
import { BoardContext } from "../contexts/BoardContext";

const BoardPage = () => {
  const { board, handleDragEnd, refreshBoard } = useContext(BoardContext);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Button variant="contained" onClick={refreshBoard} sx={{ mb: 2 }}>
          Refresh Board
        </Button>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            p: 2,
            gap: 2,
            overflowX: "auto",
            minHeight: "calc(100vh - 128px)",
          }}
        >
          {board?.columns?.map((column) => (
            <Column key={column?._id} column={column} />
          ))}
        </Box>
      </DragDropContext>
    </>
  );
};

export default BoardPage;
