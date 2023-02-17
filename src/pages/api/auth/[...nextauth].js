import bcrypt from "bcrypt";

import User from "models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { connectDB } from "@/helpers/db";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

connectDB();
const signInUser = async ({ user, password }) => {
  if (!password) {
    throw new Error("Please, enter a password");
  }

  const testPassword = await bcrypt.compare(password, user.password);

  if (!testPassword) {
    throw new Error("Passwords is incorrect");
  }

  return user;
};

export const authOptions = {
  // Adapter
  adapter: MongoDBAdapter(clientPromise),
  // providers
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (user) {
          return signInUser({ password, user });
        } else {
          throw new Error("Email does not exist");
        }
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      return {
        ...session,
        user: { ...session.user, id: token.sub, role: user.role },
      };
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secert: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
