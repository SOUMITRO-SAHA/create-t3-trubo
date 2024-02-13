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

// Define the AuthSession type
export type AuthSession = {
	user: User;
};

// Define the token type
type Token = {
	id: string;
	name: string;
	email: string;
	picture: string;
	username: string;
};

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
		async session({ token, session }) {
			if (token) {
				// Ensure session.user exists and initialize if necessary
				if (!session.user) {
					session.user = {} as User;
				}
				// Assign token properties to session user object
				// session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
				// session.user.username = token.username;
			}

			return session;
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
