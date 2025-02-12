import { Session } from "next-auth";

export type Role = "drop" | "admin";

export type LoginFormType = {
  username: string;
  password: string;
};

export type UserForm = {
  name: string;
  email: string | null;
  role: Role;
  password: string;
};

export interface UserFormWithLabel {
  name: string;
  email: string | null;
  role: { label: string; value: string };
  password: string;
}

export interface UserSession extends Session {
  expires: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}
