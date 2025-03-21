export const getUsers = async () => {
  const response = await fetch("/api/users/");
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const removeUser = async (id: string) => {
  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
};
