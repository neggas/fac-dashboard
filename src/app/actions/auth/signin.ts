"use server";
import { LoginFormType } from "@/app/types";
import * as bcrypt from "bcryptjs";
import {
  createServerAction,
  ServerActionError,
} from "@/app/lib/action-utils.ts";
import CredentialsSignin from "next-auth";
import { getUserFromDb } from "@/services/getUser";

export const login = createServerAction(async (credentials: LoginFormType) => {
  try {
    const user = await getUserFromDb(credentials.username);

    if (!user.id) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof CredentialsSignin) {
      const error = {
        username: "Aucun compte associé à ce nom d'utilisateur.",
        password: "Mot de passe incorrect. Veuillez réessayer.",
      };
      throw new ServerActionError(JSON.stringify(error));
    }

    throw new ServerActionError("Une erreur inattendue est survenue.");
  }
});
