import { Router } from "express";
import {
	createDiscussion,
	getDiscussion,
	sendMessageToAi,
} from "../controllers/discussion.controller.js";

const router = Router();

router.post("/", createDiscussion);
router.get("/:id", getDiscussion);
router.patch("/", sendMessageToAi);

export default router;
