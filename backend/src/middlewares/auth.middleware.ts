import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getToken } from "next-auth/jwt";

const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!token) {
			throw new Error("Unauthorized");
		}
		req.user = { id: token.userId as string };
		next();
	}
);

export default authMiddleware;
