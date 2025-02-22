import React from "react";
import { NavigationLinkType } from "@/config/types";
import { Flex, Text } from "@chakra-ui/react";
import DashboardIcon from "@/config/themes/icons/Dashboard";
import PaymentIcon from "@/config/themes/icons/Payment";
import AnalyseIcon from "@/config/themes/icons/Analyse";
import UserIcon from "@/config/themes/icons/UserIcon";
import { NavigationLink } from "@/config/themes/components/display/NavigationLink";
import { ROUTES } from "@/config/constants";
export const navigationsLinks: NavigationLinkType[] = [
  {
    component: (
      <NavigationLink
        href={ROUTES.DASHBOARD_PAGE}
        component={
          <Flex w="full" gap="10px" align="center">
            <DashboardIcon fill="none" width="25px" height="25px" />
            <Text textAlign="left" textStyle="lg">
              Tableau de bord
            </Text>
          </Flex>
        }
      />
    ),
  },
  {
    component: (
      <NavigationLink
        href={ROUTES.INVOICE_PAGE}
        component={
          <Flex w="full" gap="10px" align="center">
            <PaymentIcon fill="none" width="25px" height="25px" />
            <Text textAlign="left" textStyle="lg">
              Factures
            </Text>
          </Flex>
        }
      />
    ),
  },

  {
    component: (
      <NavigationLink
        href={ROUTES.DEVIS_PAGE}
        component={
          <Flex w="full" gap="10px" align="center">
            <AnalyseIcon fill="none" width="25px" height="25px" />
            <Text textAlign="left" textStyle="lg">
              Devis
            </Text>
          </Flex>
        }
      />
    ),
  },

  {
    component: (
      <NavigationLink
        href={ROUTES.USERS_PAGE}
        component={
          <Flex w="full" gap="10px" align="center">
            <UserIcon fill="none" width="25px" height="25px" />
            <Text textAlign="left" textStyle="lg">
              Utilisateurs
            </Text>
          </Flex>
        }
      />
    ),
  },
];
