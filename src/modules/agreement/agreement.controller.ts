import { Request, Response } from "express";
import { AgreementServices } from "./agreement.service";

const createAgreement = async (req: Request, res: Response) => {
  try {
    const result = await AgreementServices.createAgreementDB(req.body);
    res.status(201).json({
      success: true,
      message: "Agreement created successfully! 📜",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create agreement.",
      error: err,
    });
  }
};

const getAgreement = async (req: Request, res: Response) => {
  try {
    const result = await AgreementServices.getAgreementDB();
    res.status(200).json({
      success: true,
      message: "Agreements fetched successfully! 📂",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve agreements.",
      error: err,
    });
  }
};

const getAgreementData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AgreementServices.getAgreementID(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Agreement not found! 🔍",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching agreement details.",
      error: err,
    });
  }
};

const updateAgreement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AgreementServices.updateAgreement(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Agreement updated successfully! ✅",
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

const deleteAgreement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AgreementServices.deleteAgreement(id as string);
    res.status(200).json({
      success: true,
      message: "Agreement deleted successfully! 🗑️",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not delete the agreement.",
      error: err,
    });
  }
};



export const AgreementControlled = {
  createAgreement,
  getAgreement,
  getAgreementData,
  updateAgreement,
  deleteAgreement,
};