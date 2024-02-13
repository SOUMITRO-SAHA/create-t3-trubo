import NextAuth from "next-auth";
import { authOptions } from "../../../../../lib/authOption";
export type { Session } from "next-auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };