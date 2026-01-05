import { Request, Response } from "express";
import { AgreementServices } from "./agreement.service";


const createAgreement = async (req: Request, res: Response) => {
  return await AgreementServices.createAgreementDB(req.body);
};

const getAgreement = async (req: Request, res: Response) => {
  const result = await AgreementServices.getAgreementDB();
  res.status(200).json({ success: true, data: result });
};

const getAgreementData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AgreementServices.getAgreementID(id as string);
  res.status(200).json({ success: true, data: result });
};

const updateAgreement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AgreementServices.updateAgreement(id as string, req.body);
  res.status(200).json({ success: true, data: result });
};


const deleteAgreement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AgreementServices.deleteAgreement(id as string);
  res.status(200).json({ success: true, data: result });
};



export const AgreementControlled = {

    createAgreement,
    getAgreement,
    getAgreementData,
    updateAgreement,
    deleteAgreement

}   

