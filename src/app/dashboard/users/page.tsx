"use client";

import PageHeader from "@/app/components/PageHeader";
import { usersColumn } from "@/app/lib/table-columns/user-columns";
import { getUsers, removeUser } from "@/app/utils/api/users";
import { DataTable } from "@/config/themes/components/display/DataTable/Table";
import { Box, Flex } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/config/themes/components/display/Loading";
import { NavigationLink } from "@/config/themes/components/display/NavigationLink";
import { ROUTES } from "@/config/constants";
import { User } from "@/app/types";

const Users = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: removeUser,
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      queryClient.setQueryData<User[]>(["users"], (old) =>
        old?.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },
    onError: (err, userId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const usersData = users?.map((user: User) => ({
    ...user,
    action: () => deleteUser(user.id),
  }));

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
          <DataTable columns={usersColumn} data={usersData} />
        </Box>
      )}
    </Box>
  );
};

export default Users;
