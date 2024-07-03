// 将auth.config的配置挂载到next-auth上，使配置真正生效
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
