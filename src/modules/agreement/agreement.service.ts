import { prisma } from "../../lib/prisma";

// Create Agreement 
const createAgreementDB = async (postData: any) => {
  // Logic remains direct as route is restricted to ADMIN
  return await prisma.agreement.create({
    data: postData,
  });
};

// GET all Agreements
// UPDATE: Added user argument for role-based filtering
const getAgreementDB = async (user: any) => {
  // Admin sees all agreements in the system
  if (user.role === "ADMIN") {
    return await prisma.agreement.findMany();
  }

  // Employees/Managers see only agreements assigned to them
  return await prisma.agreement.findMany({
    where: {
      userId: user.id, // UPDATE: Filters by the logged-in user's ID
    },
  });
};

// Get single Agreement
// UPDATE: Added user argument to prevent unauthorized access via direct ID
const getAgreementID = async (id: string, user: any) => {
  if (user.role === "ADMIN") {
    return await prisma.agreement.findUnique({
      where: { id },
    });
  }

  // Regular users can only fetch the agreement if it matches the ID AND their User ID
  return await prisma.agreement.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });
};

// Update Agreement
const updateAgreement = async (id: string, payload: any) => {
  // Access is controlled at the Route level (ADMIN only)
  return await prisma.agreement.update({
    where: { id },
    data: payload,
  });
};

// Delete Agreement
const deleteAgreement = async (id: string) => {
  // Access is controlled at the Route level (ADMIN only)
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