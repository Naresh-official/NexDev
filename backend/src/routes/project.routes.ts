import { Router } from "express";

import {
	createProject,
	getAllProjects,
	getProjectDetails,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectDetails);

export default router;
