import { object, ObjectSchema, string } from "yup";
import { LoginFormType } from "@/app/types";

export const loginSchema: ObjectSchema<LoginFormType> = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});
