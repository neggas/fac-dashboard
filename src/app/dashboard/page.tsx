"use client";
import FinancialCard from "@/app/components/dashboard-home/FinancialCard";
import PageHeader from "@/app/components/PageHeader";
import { Box, Flex } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box w="full">
      <PageHeader title="Tableau de bord" />
      <Flex w="full" className="card-list-container" mt="40px" gap="20px">
        <FinancialCard title="Tatal de facture réçues" amount={`£25000`} />
        <FinancialCard title="Tatal de facture à venir" amount={`£25000`} />
        <FinancialCard title="Tatal de facture perdues" amount={`£25000`} />
      </Flex>
    </Box>
  );
};

export default Dashboard;
