import UserModel from "@/models/user.model";
import dbConnect from "@/util/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { name, email, password, avatarUrl } = await request.json();

		await dbConnect();

		const existingUserWithEmail = await UserModel.findOne({ email });
		if (existingUserWithEmail) {
			return new NextResponse("User with this email already exists", {
				status: 409,
			});
		}
		const newUser = await UserModel.create({
			name,
			email,
			password,
			avatarUrl,
			authProvider: "CREDENTIAL",
		});

		const displayUser = {
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			avatarUrl: newUser.avatarUrl,
		};
		return NextResponse.json(displayUser, { status: 201 });
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof Error) {
			console.log(error.message);
			return new NextResponse(error.message, { status: 400 });
		}
		return new NextResponse("Something went wrong", { status: 500 });
	}
}
