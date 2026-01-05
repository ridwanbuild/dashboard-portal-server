import express, { Request, Response } from "express";
import { PostController } from "./controller";

const router = express.Router();

router.post("/", PostController.createPost);

router.get("/", PostController.getAllMessage);
router.get("/:id", PostController.getSingleMessage);
router.patch("/:id", PostController.updateMessage);
router.delete("/:id", PostController.deleteMessage);

export const PostRoutes = router;
