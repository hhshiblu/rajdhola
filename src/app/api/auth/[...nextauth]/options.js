import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";
import prisma from "../../../../../prisma/prisma";

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const findUser = await prisma.users.findFirst({
          where: {
            phoneNumber: parseInt(user.phoneNumber, 10),
          },
        });
        console.log(findUser);
        if (findUser) {
          return true;
        }
        await prisma.users.create({
          data: {
            email: user.email,
            name: user.name,
            role: "user",
          },
        });

        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.addresses = user.addresses;
        token.phoneNumber = user.phoneNumber;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        phoneNumber: {
          label: "phoneNumber",
          type: "number",
          placeholder: "Enter your phone number",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { phoneNumber, password } = credentials;
        console.log(phoneNumber, password);
        if (!phoneNumber || !password) {
          return null;
        }

        const user = await prisma.users.findFirst({
          where: {
            phoneNumber: parseInt(phoneNumber, 10),
          },
        });
        console.log(user);
        if (!user) {
          return null;
        }
        const ispasswordOk = await compare(password, user.password);
        if (!ispasswordOk) {
          return null;
        }
        console.log(user);
        return user;
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
};
