import { prisma } from "../../lib/prisma";

// create Agreement DB
const createAgreementDB = async (postData: {
  title: string;
  type: string;
  content: string;
  userId?: string;
}) => {
  return await prisma.agreement.create({
    data: postData,
  });
};

// GET Agreement db
const getAgreementDB = async () => {
  return await prisma.agreement.findMany();
};

// Get Agreement single db
const getAgreementID = async (id: string) => {
  return await prisma.agreement.findUnique({
    where: { id },
  });
};


// Agreement update
const updateAgreement = async (id: string, payload: any) => {
  return await prisma.agreement.update({
    where: { id },
    data: payload,
  });
};



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
