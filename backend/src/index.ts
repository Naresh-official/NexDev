import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";

dotenv.config();

dbConnect()
	.then(() => {
		app.on("error", (error) => {
			throw error;
		});
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server started on port ${process.env.PORT || 8000}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to database : ", error);
		process.exit(1);
	});
