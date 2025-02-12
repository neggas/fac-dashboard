"use server";

import {
  createServerAction,
  ServerActionError,
} from "@/app/lib/action-utils.ts";
import { UserForm, UserSession } from "@/app/types";
import { RoleEnum } from "@/config/constants";
import db from "@/db";
import { users } from "@/db/schema/user.schema";
import { getServerAuthSession } from "@/server/auth";

import bcrypt from "bcryptjs";

export const saveNewUser = createServerAction(async (user: UserForm) => {
  try {
    const session = (await getServerAuthSession()) as UserSession;

    if (!session || session.user.role !== RoleEnum.admin) {
      throw new ServerActionError("Unhotorized");
    }

    const hashPassword = await bcrypt.hash(user.password, 10);
    return db
      .insert(users)
      .values({
        name: user.name,
        email: user.email,
        password: hashPassword,
        role: user.role,
      })
      .returning();
  } catch (error: unknown) {
    console.log(error);
    throw new ServerActionError("Une erreur est apparue");
  }
});
