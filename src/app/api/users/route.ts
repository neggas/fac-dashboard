import { getUsers } from "@/app/actions/users";

export const GET = async () => {
  const fetchedUsers = await getUsers();
  if (!fetchedUsers.success) {
    return new Response(JSON.stringify(fetchedUsers.error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(fetchedUsers.value), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
