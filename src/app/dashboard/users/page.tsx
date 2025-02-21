"use client";

import PageHeader from "@/app/components/PageHeader";
import { usersColumn } from "@/app/lib/table-columns/user-columns";
import { getUsers } from "@/app/utils/api/users";
import { DataTable } from "@/config/themes/components/display/DataTable/Table";
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
  return (
    <Box w="full" h="dvh">
      <PageHeader title="Listes tout les users" />

      <DataTable columns={usersColumn} data={users} />
    </Box>
  );
};

export default Users;
