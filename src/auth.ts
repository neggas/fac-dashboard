import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/app/lib/form-validation";
import bcrypt from "bcrypt";
import { getUserFromDb } from "@/services/getUser";
import { AdapterUser } from "next-auth/adapters";

const errors = {
  username: "",
  password: "",
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Connexion",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const validateData = await loginSchema.validate(credentials);
          const user = await getUserFromDb(validateData.username);

          if (!user) {
            errors.username = "This username is not registered";
          }
          const isPasswordCorrect = await bcrypt.compare(
            validateData.password,
            user.password
          );
          if (!isPasswordCorrect) {
            errors.password = "Invalid password";
          }
          if (errors.username || errors.password) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", // Utilisation de JWT pour les sessions
  },
  pages: {
    signIn: "/auth/login", // Redirection en cas d'authentification échouée
  },

  callbacks: {
    async jwt({ token, user }) {
      const parsedUser = user as AdapterUser & { role: "admin" | "drop" };
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = parsedUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          emailVerified: token.emailVerified as Date,
          role: token.role as "admin" | "drop",
        } as AdapterUser & User & { role: "admin" | "drop" };
      }
      return session;
    },
  },
});
