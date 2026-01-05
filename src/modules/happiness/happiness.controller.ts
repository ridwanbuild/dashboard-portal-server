import { Request, Response } from "express";
import { HappinessServices } from "./happiness.services";


const createMessage = async (req: Request, res: Response) => {
  try {
    const result = await HappinessServices.createMessageDB(req.body);
    res.status(200).json({
      success: true,
      message: "Controller: Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Controller:  Something went wrong",
      error,
    });
  }
};


const getAllMessage = async (req: Request, res: Response) => {
  const result = await HappinessServices.getAllMessageDB();
  res.status(200).json({ success: true, data: result });
};


const getSingleMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HappinessServices.getSingleMessageDB(id as string);
  res.status(200).json({ success: true, data: result });
};



const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await HappinessServices.updateMessageDB(id as string, req.body);
  res.status(200).json({ success: true, message: "Updated!", data: result });
};



const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  await HappinessServices.deleteMessageDB(id as string);
  res.status(200).json({ success: true, message: "Deleted successfully!" });
};



export const HappinessController = {
  createMessage,
  getAllMessage,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
