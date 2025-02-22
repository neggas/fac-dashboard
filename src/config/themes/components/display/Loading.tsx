"use client";
import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex w="full" h="calc(100vh - 200px)" justify="center" align="center">
      <Spinner size="xl" color="#18181b" />;
    </Flex>
  );
};

export default Loading;
