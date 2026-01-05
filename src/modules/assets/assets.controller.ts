import { Request, Response } from "express";
import { AssetsServices } from "./assets.service";

const createAssets = async (req: Request, res: Response) => {
  return await AssetsServices.createAssetsDB(req.body);
};

const getAssets = async (req: Request, res: Response) => {
  const result = await AssetsServices.getAssetsDB();
  res.status(200).json({ success: true, data: result });
};

const getSingleData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssetsServices.getAssetsID(id as string);
  res.status(200).json({ success: true, data: result });
};

const updateAssets = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssetsServices.updateAssets(id as string, req.body);
  res.status(200).json({ success: true, data: result });
};


const deleteAssets = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AssetsServices.deleteAssets(id as string);
  res.status(200).json({ success: true, data: result });
};


export const AssetsControlled = {
  createAssets,
  getAssets,
  getSingleData,
  updateAssets,
  deleteAssets,
};
