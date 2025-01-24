import { Router } from "express";
import { createDiscussion } from "../controllers/discussion.controller.js";

const router = Router();

router.post("/", createDiscussion);

export default router;
