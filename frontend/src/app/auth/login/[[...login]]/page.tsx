"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LuGithub } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { handleError } from "@/util/errorhandler";

interface LoginForm {
	email: string;
	password: string;
}

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<LoginForm>({
		email: "",
		password: "",
	});
	const searchParms = useSearchParams();
	const router = useRouter();
	const redirectUrl = (searchParms.get("redirectUrl") ||
		"/dashboard") as string;

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false,
			});

			if (result?.error) {
				setError(result.error);
			} else {
				setFormData({
					email: "",
					password: "",
				});
				setError(null);
				router.push(redirectUrl);
			}
		} catch (error: unknown) {
			console.log(error);
			setError(handleError(error));
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSocialSignIn = async (provider: string) => {
		setIsLoading(true);
		try {
			await signIn(provider, {
				callbackUrl: redirectUrl,
			});
		} catch (error: unknown) {
			setError(handleError(error));
		} finally {
			setIsLoading(false);
		}
	};

	const formVariants = {
		hidden: { opacity: 0, y: 30, scale: 0.5 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const buttonHover = {
		hover: { scale: 1.02, transition: { duration: 0.3 } },
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
			<motion.div
				initial={{ opacity: 0, y: -20, scale: 1.5 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="w-full max-w-md backdrop-blur-lg bg-background/80 border-primary/20">
					<CardHeader>
						<CardTitle className="text-2xl font-bold text-center">
							<motion.span
								className="inline-block"
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								Welcome back to NexDev
							</motion.span>
						</CardTitle>
						<CardDescription className="text-center">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								Log in to your account and continue building
								amazing websites
							</motion.div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<motion.form
							onSubmit={handleLogin}
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 1 },
								visible: {
									transition: { staggerChildren: 0.1 },
								},
							}}
							className="space-y-4"
						>
							<motion.div
								variants={formVariants}
								className="space-y-2"
							>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="john@example.com"
									value={formData.email}
									onChange={handleInputChange}
									disabled={isLoading}
									className="transition-all duration-300 focus:ring-2 focus:ring-primary"
									required
								/>
							</motion.div>
							<motion.div
								variants={formVariants}
								className="space-y-2"
							>
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleInputChange}
									disabled={isLoading}
									className="transition-all duration-300 focus:ring-2 focus:ring-primary"
									required
								/>
							</motion.div>
							<motion.div variants={formVariants}>
								<motion.button
									type="submit"
									className="w-full px-4 py-2 bg-primary rounded-md flex items-center justify-center text-white"
									whileHover="hover"
									variants={buttonHover}
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Logging in...
										</>
									) : (
										<>
											Log In
											<ArrowRight className="ml-2 h-4 w-4" />
										</>
									)}
								</motion.button>
							</motion.div>
						</motion.form>
						{error && (
							<Alert className="mt-6 w-full text-red-500 border-2 border-red-600">
								<AlertTitle>Error while signing up</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t border-muted-foreground" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										Or sign up with
									</span>
								</div>
							</div>
							<div className="mt-6 grid grid-cols-2 gap-4">
								<Button
									variant="outline"
									className="hover:scale-105 transition-all duration-300"
									onClick={() => handleSocialSignIn("github")}
								>
									<LuGithub className="mr-2 h-4 w-4" />
									Github
								</Button>
								<Button
									variant="outline"
									className="hover:scale-105 transition-all duration-300"
									onClick={() => handleSocialSignIn("google")}
								>
									<FaGoogle className="mr-2 h-4 w-4" />
									Google
								</Button>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center">
						<Link href={`/auth/signup?redirectUrl=${redirectUrl}`}>
							<Button
								variant="link"
								className="text-muted-foreground"
							>
								Don't have an account?{" "}
								<span className="text-primary">Sign Up</span>
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
}
