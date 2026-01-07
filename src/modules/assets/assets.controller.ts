import { Request, Response } from "express";
import { AssetsServices } from "./assets.service";

const createAssets = async (req: Request, res: Response) => {
  try {
    const result = await AssetsServices.createAssetsDB(req.body);
    res.status(201).json({
      success: true,
      message: "Asset created successfully! ✨",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong while creating the asset.",
      error: err,
    });
  }
};

const getAssets = async (req: Request, res: Response) => {
  try {
    const result = await AssetsServices.getAssetsDB();
    res.status(200).json({
      success: true,
      message: "Assets retrieved successfully! 📊",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assets.",
      error: err,
    });
  }
};

const getSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AssetsServices.getAssetsID(id as string);
    
    if (!result) {
      return res.status(404).json({ success: false, message: "Asset not found! 🔍" });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching the specific asset.",
      error: err,
    });
  }
};

const updateAssets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AssetsServices.updateAssets(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Asset updated successfully! 🛠️",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Update failed.",
      error: err,
    });
  }
};

const deleteAssets = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AssetsServices.deleteAssets(id as string);
    res.status(200).json({
      success: true,
      message: "Asset deleted successfully! 🗑️",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete the asset.",
      error: err,
    });
  }
};

export const AssetsControlled = {
  createAssets,
  getAssets,
  getSingleData,
  updateAssets,
  deleteAssets,
};