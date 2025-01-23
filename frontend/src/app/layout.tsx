import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "@/context/authSessionProvider";
import OptionalRootLayout from "@/components/OptionalRootLayout";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NexDev",
	description: "AI-Powered Nextjs Website Generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<AuthSessionProvider>
				<body
					className={`${poppins.className} antialiased bg-background h-screen`}
				>
					<OptionalRootLayout>{children}</OptionalRootLayout>
				</body>
			</AuthSessionProvider>
		</html>
	);
}
