import mongoose from "mongoose";

const dbConnect: () => Promise<typeof mongoose> = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGODB_URI!);
		console.log(`MongoDB connected: ${connection.connection.host}`);
		return connection;
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export default dbConnect;
