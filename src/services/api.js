const BASE_URL = "http://localhost:3000";

export const applyLeave = async (data) => {
  const response = await fetch(`${BASE_URL}/api/leave/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to apply leave");
  }

  return response.json();
};
