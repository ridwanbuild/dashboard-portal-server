import { Request, Response } from "express";
import { EmployeeServices } from "./employee.services";





const createEmployee = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeServices.createEmployeeDB(req.body);
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




const getEmployee = async (req: Request, res: Response) => {
  try {
    // UPDATE: Using 'as any' to bypass TypeScript error for req.user
    const user = req.user as any;

    // UPDATE: Passing the user object to the service (Argument fix for role-based filtering)
    const result = await EmployeeServices.getEmployeeDB(user);
    
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
    // UPDATE: Extracting user data for security verification
    const user = req.user as any;

    // UPDATE: Passing both the asset ID and the user object to the service
    const result = await EmployeeServices.getEmployeeID(id as string, user);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: "Asset not found or unauthorized! 🔍" 
      });
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



const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EmployeeServices.updateEmployee(id as string, req.body);
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




const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EmployeeServices.deleteEmployee(id as string);
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




export const employeeControlled = {
  createEmployee,
  getEmployee,
  getSingleData,
  updateEmployee,
  deleteEmployee
};