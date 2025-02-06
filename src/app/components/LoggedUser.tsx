"use client";
import { Flex, MenuSelectionDetails, Text } from "@chakra-ui/react";
import { Avatar } from "@/config/themes/chakra/avatar";
import { Menu } from "@/config/themes/components/display/Menu";
import { LOGOUT_LABEL } from "@/config/constants";
import { signOut } from "next-auth/react";
interface LoggedUserProps {
  name: string;
}

const TriggerItem = ({ name }: LoggedUserProps) => {
  return (
    <Flex gap="10px" align="center">
      <Avatar name={name} w="20px" h="20px" size="lg" colorPalette="black" />
      <Text textStyle="body">{name} (admin)</Text>
    </Flex>
  );
};

const LoggedUser = ({ name }: LoggedUserProps) => {
  const handleItemSelect = async (details: MenuSelectionDetails) => {
    if (details.value === LOGOUT_LABEL) {
      await signOut({
        redirect: true,
        callbackUrl: "/auth/login",
      });
    }
  };
  return (
    <Menu
      items={[{ label: "Déconnexion", value: "logout" }]}
      triggerItem={<TriggerItem name={name} />}
      onItemSelect={handleItemSelect}
    />
  );
};

export default LoggedUser;
