"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { User } from "@/app/types";
import { Text } from "@chakra-ui/react";

const usersColumnHelper = createColumnHelper<Partial<User>>();
export const usersColumn = [
  usersColumnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <Text>Nom</Text>,
  }),
  usersColumnHelper.accessor("email", {
    id: "email",
    cell: (info) => info.getValue(),
    header: () => <Text>Email</Text>,
  }),
  usersColumnHelper.accessor("role", {
    id: "role",
    cell: (info) => info.getValue(),
    header: () => <Text>Role</Text>,
  }),
];
