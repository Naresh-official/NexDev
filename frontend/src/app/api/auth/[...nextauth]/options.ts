import UserModel, { IUser } from "@/models/user.model";
import dbConnect from "@/util/dbConnect";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface ICredentials {
	email: string;
	password: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			httpOptions: {
				timeout: 30000,
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			httpOptions: {
				timeout: 30000,
			},
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials): Promise<User | null> {
				try {
					if (!credentials) {
						throw new Error("Credentials are missing");
					}
					const { email, password } = credentials as ICredentials;
					await dbConnect();
					const user: IUser | null = await UserModel.findOne({
						email,
					}).select("+password");
					if (!user) {
						throw new Error("User not found");
					}

					if (
						user.authProvider === "CREDENTIAL" &&
						user?.comparePassword(password)
					) {
						return {
							id: user._id.toString(),
							name: user.name,
							email: user.email,
						} as User;
					} else {
						throw new Error("Invalid credentials");
					}
				} catch (error: unknown) {
					if (error instanceof Error) {
						throw new Error(error.message);
					}
					throw new Error(
						"Something went wrong in credentials provider"
					);
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (
					account?.provider === "github" ||
					account?.provider === "google"
				) {
					return await handleSocialLogin(
						user,
						account.provider.toUpperCase()
					);
				}
				if (account?.provider === "credentials") {
					return true;
				}
				return false;
			} catch (error: any) {
				console.error(`Error in signIn callback: ${error.message}`);
				return false;
			}
		},

		async jwt({ token, user }) {
			if (user) {
				token.userId = user.id;
			}
			return token;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 2 * 24 * 60 * 60, // 2 days
	},
	pages: {
		signIn: "/auth/login",
	},
};

async function handleSocialLogin(user: User, provider: string) {
	await dbConnect();
	const existingUser = await UserModel.findOne({
		email: user?.email as string,
	});

	if (!existingUser) {
		const newUser = await UserModel.create({
			name: user?.name as string,
			email: user?.email as string,
			password: null,
			isSocialLogin: true,
			avatarUrl: user?.image as string,
			authProvider: provider,
		});
		user.id = newUser._id.toString();
		return true;
	} else if (existingUser.authProvider === provider) {
		user.id = existingUser._id.toString();
		return true;
	} else {
		console.error(
			`User exists with a different provider: ${existingUser.authProvider}`
		);
		return false;
	}
}
