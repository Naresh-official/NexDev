"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LuGithub } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { handleError } from "@/util/errorhandler";
import axios from "axios";

export interface SignupForm {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const formVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.5 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export const buttonHover = {
	hover: { scale: 1.02, transition: { duration: 0.3 } },
};

export default function SignupPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<SignupForm>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const searchParms = useSearchParams();
	const redirectUrl = (searchParms.get("redirectUrl") ||
		"/dashboard") as string;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSignUp = async function (e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (
				!formData.name ||
				!formData.email ||
				!formData.password ||
				!formData.confirmPassword
			) {
				setError("All fields are required");
				return;
			}
			if (formData.password !== formData.confirmPassword) {
				setError("Passwords do not match");
				return;
			}
			const { data } = await axios.post("/api/signup", formData);
			if (data._id) {
				setError(null);
				router.push(`/auth/login?redirectUrl=${redirectUrl}`);
			}
		} catch (error: unknown) {
			setError(handleError(error));
		} finally {
			setIsLoading(false);
		}
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
								Join NexDev
							</motion.span>
						</CardTitle>
						<CardDescription className="text-center">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								Create your account and start building amazing
								websites
							</motion.div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<motion.form
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 1 },
								visible: {
									transition: { staggerChildren: 0.1 },
								},
							}}
							className="space-y-4"
							onSubmit={handleSignUp}
						>
							<motion.div
								variants={formVariants}
								className="space-y-2"
							>
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									name="name"
									placeholder="John Doe"
									value={formData.name}
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
									type={showPassword ? "text" : "password"}
									value={formData.password}
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
								<Label htmlFor="confirm-password">
									Confirm password
								</Label>
								<Input
									id="confirm-password"
									name="confirmPassword"
									type={showPassword ? "text" : "password"}
									value={formData.confirmPassword}
									onChange={handleInputChange}
									disabled={isLoading}
									className="transition-all duration-300 focus:ring-2 focus:ring-primary"
									required
								/>
							</motion.div>
							<motion.div
								variants={formVariants}
								className="flex items-center"
							>
								<Checkbox
									id="show-password"
									checked={showPassword}
									onCheckedChange={() =>
										setShowPassword(!showPassword)
									}
								/>
								<label htmlFor="show-password" className="ml-2">
									Show password
								</label>
							</motion.div>
							<div id="clerk-captcha"></div>
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
											Signing up...
										</>
									) : (
										<>
											Sign Up
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
						<Link href={`/auth/login?redirectUrl=${redirectUrl}`}>
							<Button
								variant="link"
								className="text-muted-foreground"
							>
								Already have an account?{" "}
								<span className="text-primary">Login</span>
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
}
