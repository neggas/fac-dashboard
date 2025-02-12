import { mixed, object, ObjectSchema, string } from "yup";
import { LoginFormType, Role } from "@/app/types";

export const loginSchema: ObjectSchema<LoginFormType> = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

export const createUserSchema = object({
  name: string().required("pseudo is required"),
  password: string().required("password is required"),
  email: string().email().nullable(),
  role: mixed<Role>().required("role is required"),
});
