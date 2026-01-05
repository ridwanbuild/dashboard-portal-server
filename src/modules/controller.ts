import { Request, Response } from "express";
import { PostServices } from "./services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostServices.createPostIntoDB(req.body);
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
  const result = await PostServices.getAllMessageDB();
  res.status(200).json({ success: true, data: result });
};


const getSingleMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostServices.getSingleMessageDB(id as string);
  res.status(200).json({ success: true, data: result });
};



const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PostServices.updateMessageDB(id as string, req.body);
  res.status(200).json({ success: true, message: "Updated!", data: result });
};



const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  await PostServices.deleteMessageDB(id as string);
  res.status(200).json({ success: true, message: "Deleted successfully!" });
};



export const PostController = {
  createPost,
  getAllMessage,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
