import { prisma } from "../../lib/prisma";

// create Agreement 
const createAgreementDB = async (postData: any) => {
  return await prisma.agreement.create({
    data: postData,
  });
};

// GET all Agreements
const getAgreementDB = async () => {
  return await prisma.agreement.findMany();
};

// Get single Agreement
const getAgreementID = async (id: string) => {
  return await prisma.agreement.findUnique({
    where: { id },
  });
};

// Update Agreement
const updateAgreement = async (id: string, payload: any) => {
  return await prisma.agreement.update({
    where: { id },
    data: payload,
  });
};

// Delete Agreement
const deleteAgreement = async (id: string) => {
  return await prisma.agreement.delete({
    where: { id },
  });
};

export const AgreementServices = {
  createAgreementDB,
  getAgreementDB,
  getAgreementID,
  updateAgreement,
  deleteAgreement,
};