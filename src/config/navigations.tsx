import React from "react";
import { NavigationLinkType } from "@/config/types";
import { Flex, Link, Text } from "@chakra-ui/react";
import DashboardIcon from "@/config/themes/icons/Dashboard";
import PaymentIcon from "@/config/themes/icons/Payment";
import AnalyseIcon from "@/config/themes/icons/Analyse";
import UserIcon from "@/config/themes/icons/UserIcon";
export const navigationsLinks: NavigationLinkType[] = [
  {
    component: (
      <Link
        href="/dashboard"
        textAlign="left"
        h="36px"
        py="10px"
        px="12px"
        textStyle="heading-sm"
        rounded="6px"
        _hover={{
          textDecoration: "none",
          bg: "black",
          color: "white",
          "& path": {
            stroke: "white",
          },
          "& ellipse": {
            fill: "white",
          },
          "& rect": {
            stroke: "white",
          },
        }}>
        <Flex w="full" gap="10px" align="center">
          <DashboardIcon fill="none" width="25px" height="25px" />
          <Text textAlign="left" textStyle="lg">
            Tableau de bord
          </Text>
        </Flex>
      </Link>
    ),
  },

  {
    component: (
      <Link
        href="/dashboard/factures"
        textAlign="left"
        h="36px"
        py="10px"
        px="12px"
        textStyle="heading-sm"
        rounded="6px"
        _hover={{
          textDecoration: "none",
          bg: "black",
          color: "white",
          "& path": {
            stroke: "white",
          },
          "& ellipse": {
            fill: "white",
          },
          "& rect": {
            stroke: "white",
          },
        }}>
        <Flex w="full" gap="10px" align="center">
          <PaymentIcon fill="none" width="25px" height="25px" />
          <Text textAlign="left" textStyle="lg">
            Factures
          </Text>
        </Flex>
      </Link>
    ),
  },

  {
    component: (
      <Link
        href="/dashboard/devis"
        textAlign="left"
        h="36px"
        py="10px"
        px="12px"
        textStyle="heading-sm"
        rounded="6px"
        _hover={{
          textDecoration: "none",
          bg: "black",
          color: "white",
          "& path": {
            stroke: "white",
          },
          "& ellipse": {
            fill: "white",
          },
          "& rect": {
            stroke: "white",
          },
        }}>
        <Flex w="full" gap="10px" align="center">
          <AnalyseIcon fill="none" width="25px" height="25px" />
          <Text textAlign="left" textStyle="lg">
            Devis
          </Text>
        </Flex>
      </Link>
    ),
  },

  {
    component: (
      <Link
        href="/dashboard/users"
        textAlign="left"
        h="36px"
        py="10px"
        px="12px"
        textStyle="heading-sm"
        rounded="6px"
        _hover={{
          textDecoration: "none",
          bg: "black",
          color: "white",
          "& path": {
            stroke: "white",
          },
          "& ellipse": {
            fill: "white",
          },
          "& rect": {
            stroke: "white",
          },
        }}>
        <Flex w="full" gap="10px" align="center">
          <UserIcon fill="none" width="25px" height="25px" />
          <Text textAlign="left" textStyle="lg">
            Utilisateurs
          </Text>
        </Flex>
      </Link>
    ),
  },
];
