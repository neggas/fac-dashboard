import { getServerSession, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/actions/auth/signin";
import { LoginFormType } from "@/app/types";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await login(credentials as LoginFormType);

          if (!response.success) {
            return null;
          }

          const user = response.value;

          if (!user) {
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
};

export const getServerAuthSession = () => getServerSession(authOptions);
