import { Router } from "express";

import {
	createProject,
	getAllProjects,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getAllProjects);

export default router;
