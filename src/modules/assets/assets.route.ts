import express from "express";

import { AssetsControlled } from "./assets.controller";

const router = express.Router();

router.post("/", AssetsControlled.createAssets);
router.get("/", AssetsControlled.getAssets);
router.get("/:id", AssetsControlled.getSingleData);
router.post("/:id", AssetsControlled.updateAssets);
router.post("/:id", AssetsControlled.deleteAssets);


export const AssetsRoutes = router;
