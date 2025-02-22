"use client";

import PageHeader from "@/app/components/PageHeader";
import { usersColumn } from "@/app/lib/table-columns/user-columns";
import { getUsers } from "@/app/utils/api/users";
import { DataTable } from "@/config/themes/components/display/DataTable/Table";
import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/config/themes/components/display/Loading";
import { NavigationLink } from "@/config/themes/components/display/NavigationLink";
import { ROUTES } from "@/config/constants";

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <Box w="full" h="full">
      <PageHeader title="Listes tout les users" />
      {isLoading ? (
        <Loading />
      ) : (
        <Box mt="8">
          <Flex w="full" justify="end" mb="8">
            <NavigationLink
              href={ROUTES.NEW_USER_PAGE}
              component="Ajouter un utilisateur"
            />
          </Flex>
          <DataTable columns={usersColumn} data={users} />
        </Box>
      )}
    </Box>
  );
};

export default Users;
