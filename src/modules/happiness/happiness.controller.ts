import { Request, Response } from "express";
import { HappinessServices } from "./happiness.services";

const createMessage = async (req: Request, res: Response) => {
  try {
    // UPDATE: Extracting the user from the request (injected by middleAuth)
    const user = req.user as any;
    
    // UPDATE: Passing req.body and user info to service to link the message to the sender
    const result = await HappinessServices.createMessageDB(req.body, user);
    
    res.status(200).json({
      success: true,
      message: "Controller: Post created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Controller: Something went wrong",
      error,
    });
  }
};

const getAllMessage = async (req: Request, res: Response) => {
  try {
    // UPDATE: Identifying the requester's role and ID
    const user = req.user as any;

    // UPDATE: Passing user to service for role-based data filtering
    const result = await HappinessServices.getAllMessageDB(user);
    
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch messages", error });
  }
};

const getSingleMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user as any;

    // UPDATE: Passing user info to ensure they have permission to see this specific message
    const result = await HappinessServices.getSingleMessageDB(id as string, user);
    
    if (!result) {
      return res.status(404).json({ success: false, message: "Message not found or Unauthorized" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching message", error });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // UPDATE: Only authorized roles (usually Admin) should reach this via routes
    const result = await HappinessServices.updateMessageDB(id as string, req.body);
    res.status(200).json({ success: true, message: "Updated!", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // UPDATE: Only authorized roles (usually Admin) should reach this via routes
    await HappinessServices.deleteMessageDB(id as string);
    res.status(200).json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error });
  }
};

export const HappinessController = {
  createMessage,
  getAllMessage,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};