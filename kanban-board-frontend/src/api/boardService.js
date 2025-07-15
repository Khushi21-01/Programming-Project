const API_URL = "http://localhost:3000/api";

// Fetch entire board
export const fetchBoard = async () => {
  // const response = await fetch(`${API_URL}/tasks/all`);
  const response = await fetch(`${API_URL}/board`);
  if (!response.ok) throw new Error("Failed to fetch board");
  return response.json();
};

// Update entire board
export const updateBoard = async (boardData) => {
  const response = await fetch(`${API_URL}/board`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(boardData),
  });
  if (!response.ok) throw new Error("Failed to update board");
  return response.json();
};


export default { fetchBoard, updateBoard };
