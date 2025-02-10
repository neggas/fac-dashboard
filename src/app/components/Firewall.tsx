"use client";
import { ROUTES } from "@/config/constants";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Firewall = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    redirect(ROUTES.LOGIN_PAGE);
  }

  return <>{children}</>;
};

export default Firewall;
