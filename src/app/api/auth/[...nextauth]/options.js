import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";
import prisma from "../../../../../prisma/prisma";
import connectToDB from "@/libs/connect";

export const authOptions = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const db = await connectToDB();

        const findUser = await db.collection("users").findOne({
          phoneNumber: parseInt(user.phoneNumber, 10),
        });

        if (findUser) {
          return true;
        }
        await db.collection("users").insertOne({
          email: user.email,
          name: user.name,
          role: "user",
        });

        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
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

        if (!phoneNumber || !password) {
          return null;
        }
        const db = await connectToDB();
        const user = await db.collection("users").findOne({
          phoneNumber: parseInt(phoneNumber, 10),
        });

        if (!user) {
          return null;
        }
        const ispasswordOk = await compare(password, user.password);
        if (!ispasswordOk) {
          return null;
        }

        return user;
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
};
