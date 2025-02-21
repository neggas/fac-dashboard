"use client";

import { getUsers } from "@/app/utils/api/users";
import { Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading users</Text>;

  console.log(users);
  return (
    <Box>
      <Text>Listes tout les users</Text>
    </Box>
  );
};

export default Users;
