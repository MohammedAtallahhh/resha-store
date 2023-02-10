import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./lib/mongodb";

export const authOptions = {
  // Adapter
  adapter: MongoDBAdapter(clientPromise),
  // providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    // signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secert: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
