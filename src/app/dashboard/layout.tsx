import { Box, Flex } from "@chakra-ui/react";
import Navbar from "@/app/components/Navbar";
import LayoutHeader from "@/app/components/DashboardLayoutHeader";
import Firewall from "../components/Firewall";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Firewall>
      <Flex w="dvw" h="dvh">
        <Navbar username="Arsène" />
        <Box w="calc(100% - 300px)" h="auto" className="layout-content">
          <LayoutHeader username="Arsène" />
          <Box className="layout-content-body" w="full" px="32px">
            {children}
          </Box>
        </Box>
      </Flex>
    </Firewall>
  );
};

export default DashboardLayout;
