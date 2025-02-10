"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserSession } from "../types";

const useUserSession = () => {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const getUserSession = async () => {
    const session = await getSession();
    setUserSession(session as UserSession);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      getUserSession();
    } catch {
      setUserSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { userSession, isLoading };
};

export default useUserSession;
