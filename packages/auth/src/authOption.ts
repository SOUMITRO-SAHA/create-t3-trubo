import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@repo/db";

// Define the User type
export type User = {
	id: number | string;
	name: string;
	email: string;
	image: string;
	username: string;
};

// Define the token type
type Token = {
	id: string;
	name: string;
	email: string;
	picture: string;
	username: string;
};

declare module "next-auth" {
	interface Session {
		user: User
	}
}
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
		updateAge: 24 * 60 * 60, // 24 hours
	},
	pages: {
		signIn: "/sign-in",
		error: "/error",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session (opts) {
			if (!("user" in opts)) throw "unreachable with session strategy";
	  
			return {
			  ...opts.session,
			  user: {
				...opts.session.user,
				id: opts.user.id,
			  },
			}
		},

		async jwt({ token, user }) {
			if (token && token.email) {
				const dbUser = await db.user.findFirst({
					where: {
						email: token.email,
					},
				});

				if (!dbUser) {
					token.id = user?.id || ''; // Assign an empty string if user.id is undefined
					return token;
				}

				if (!dbUser.username) {
					await db.user.update({
						where: {
							id: dbUser.id,
						},
						data: {
							username: nanoid(10),
						},
					});
				}

				return {
					id: dbUser.id!,
					name: dbUser.name!,
					email: dbUser.email!,
					picture: dbUser.image!,
					username: dbUser.username!,
				};
			}

			return token;
		},

		redirect() {
			return "/";
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
