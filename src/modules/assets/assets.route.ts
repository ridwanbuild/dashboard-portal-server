import express from "express";
import { AssetsControlled } from "./assets.controller";

const router = express.Router();

// Create an asset
router.post("/", AssetsControlled.createAssets);

// Get all assets
router.get("/", AssetsControlled.getAssets);

// Get a single asset by ID
router.get("/:id", AssetsControlled.getSingleData);

// Update an asset (Changed to PATCH) 🛠️
router.patch("/:id", AssetsControlled.updateAssets);

// Delete an asset (Changed to DELETE) 🗑️
router.delete("/:id", AssetsControlled.deleteAssets);

export const AssetsRoutes = router;