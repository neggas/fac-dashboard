import { Flex } from "@chakra-ui/react";
import InputFieldDumb from "@/config/themes/components/dumbs/InputField";

import LoggedUser from "@/app/components/LoggedUser";

interface LayoutHeaderProps {
  username: string;
}

const LayoutHeader = ({ username }: LayoutHeaderProps) => {
  return (
    <Flex
      className="layout-content-header"
      w="full"
      h="52px"
      px="24px"
      mt="5px"
      align="center">
      <InputFieldDumb
        name="globalSearch"
        maxW="506px"
        h="56px"
        w="506px"
        placeholder="Search..."
        color="black"
        outline="none"
        boxShadow="md"
      />
      <LoggedUser name={username} />
    </Flex>
  );
};

export default LayoutHeader;
