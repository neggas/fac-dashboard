"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/app/types";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";

const usersColumnHelper = createColumnHelper<
  Partial<User> & { action: () => void }
>();
export const usersColumn = [
  usersColumnHelper.accessor("name", {
    id: "name",
    cell: (info) => <Text px="2">{info.getValue()}</Text>,
    header: () => (
      <Text fontWeight="bold" p="2">
        Nom
      </Text>
    ),
  }),
  usersColumnHelper.accessor("email", {
    id: "email",
    cell: (info) => <Text px="2">{info.getValue()}</Text>,
    header: () => (
      <Text fontWeight="bold" p="2">
        Email
      </Text>
    ),
  }),
  usersColumnHelper.accessor("role", {
    id: "role",
    cell: (info) => <Text px="2">{info.getValue()}</Text>,
    header: () => (
      <Text fontWeight="bold" p="2">
        Role
      </Text>
    ),
  }),
  usersColumnHelper.accessor("action", {
    id: "action",
    cell: (info) => {
      const removeUser = info.getValue();
      return (
        <Box p="1">
          <IconButton onClick={removeUser}>
            <LuTrash2 />
          </IconButton>
        </Box>
      );
    },
    header: () => (
      <Text fontWeight="bold" p="2">
        Action
      </Text>
    ),
  }),
];
