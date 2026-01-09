import express from "express";
import { AssetsControlled } from "./assets.controller";
import middleAuth, { UserRole } from "../../middleware/middleware";

const router = express.Router();

// Create an asset
router.post("/", middleAuth(UserRole.ADMIN), AssetsControlled.createAssets);

// Get all assets
router.get("/", middleAuth(UserRole.ADMIN), AssetsControlled.getAssets);

// Get a single asset by ID
router.get("/:id", middleAuth(UserRole.MANAGER, UserRole.EMPLOYEE), AssetsControlled.getSingleData);


// Update an asset (Changed to PATCH) 
router.patch("/:id", middleAuth(UserRole.ADMIN), AssetsControlled.updateAssets);

// Delete an asset (Changed to DELETE) 
router.delete("/:id", middleAuth(UserRole.ADMIN), AssetsControlled.deleteAssets);


export const AssetsRoutes = router;