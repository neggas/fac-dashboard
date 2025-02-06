import { Session } from "next-auth";

export type LoginFormType = {
  username: string;
  password: string;
};

export interface UserSession extends Session {
  expires: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "drop";
  };
}
