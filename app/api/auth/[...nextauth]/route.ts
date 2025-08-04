import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const serverSession: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // check if user is valid
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        // this query wiill find the user credentials and return it if found any
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // if user is not found do nothing
        if (!user) return null;

        // this checks if both of the password are match by comparing two objects that are from the database and the nextAuth
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        );
        return passwordMatch ? user : null;
      },
    }),
    GoogleProvider({
      // this tells that we have a value here and it will never be undefined
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // this is required f
  // or manually signing in without using social apis
  // because this will decode to jwt since the default of auth is not using jwt code
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(serverSession);

export { handler as GET, handler as POST };
