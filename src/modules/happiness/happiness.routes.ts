import express, { Request, Response } from "express";
import { HappinessController } from "./happiness.controller";


const router = express.Router();

router.post("/", HappinessController.createMessage);

router.get("/", HappinessController.getAllMessage);
router.get("/:id", HappinessController.getSingleMessage);
router.patch("/:id", HappinessController.updateMessage);
router.delete("/:id", HappinessController.deleteMessage);

export const HappinessRoutes = router;
