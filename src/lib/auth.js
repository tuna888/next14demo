// 第三方登录
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // 自定义登录流程
    async signIn({ user, account, profile }) {
      console.log(user);

      if (account.provider === "github") {
        try {
          connectToDB();

          const person = await User.findOne({ email: user.email });

          if (!person) {
            const newPerson = new User({
              username: user.name,
              email: user.email,
              img: user.image,
            });
            await newPerson.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
