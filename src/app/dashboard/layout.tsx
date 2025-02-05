import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/components/Navbar";
import LayoutHeader from "@/app/components/DashboardLayoutHeader";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex w="full" h="full">
      <Navbar username="Arsène" />
      <Box w="calc(100% - 300px)" h="full" className="layout-content">
        <LayoutHeader username="Arsène" />
        <Box
          className="layout-content-body"
          w="full"
          h="full"
          px="32px"
          py="32px">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
