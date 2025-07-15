import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Column from "../../Components/column";
import { fetchBoard } from "../../api/boardService";

const BoardHomePage = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const data = await fetchBoard();
        setBoard(data);
      } catch (err) {
        setError(err.message || "Failed to load board");
      } finally {
        setLoading(false);
      }
    };
    loadBoard();
  }, []);

  if (loading) return <Box sx={{ p: 2 }}>Loading...</Box>;
  if (error)
    return <Box sx={{ p: 2, color: "error.main" }}>Error: {error}</Box>;

  return (
    <Box sx={{ display: "flex", p: 2, gap: 2, overflowX: "auto" }}>
      {board?.columns?.length > 0 ? (
        board.columns.map((column) => (
          <Column key={column._id} column={column} />
        ))
      ) : (
        <Box sx={{ p: 2, color: "text.secondary" }}>No columns available.</Box>
      )}
    </Box>
  );
};

export default BoardHomePage;
