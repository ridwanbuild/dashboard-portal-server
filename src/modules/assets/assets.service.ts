import { prisma } from "../../lib/prisma";

// create assets DB
const createAssetsDB = async (postData: {
  name: string;
  serialNo: string;
  userId?: string | null; 
  department: string;     
}) => {
  return await prisma.assets.create({
    data: {
      name: postData.name,
      serialNo: postData.serialNo,
      department: postData.department,
      
      userId: postData.userId || null, 
    },
  });
};

// GET all Assets with Role-based filtering
const getAssetsDB = async (user: any) => {
  if (user.role === "ADMIN") {
    return await prisma.assets.findMany({
      include: { user: true } // অ্যাডমিন যেন ইউজারের তথ্যসহ দেখতে পারে
    });
  }

  return await prisma.assets.findMany({
    where: {
      userId: user.id,
    },
  });
};

// GET single Asset
const getAssetsID = async (id: string, user: any) => {
  if (user.role === "ADMIN") {
    return await prisma.assets.findUnique({
      where: { id },
    });
  }

  return await prisma.assets.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });
};

// Update Assets
const updateAssets = async (id: string, payload: any) => {
  return await prisma.assets.update({
    where: { id },
    data: {
      ...payload,
      userId: payload.userId || null // আপডেট করার সময়ও null হ্যান্ডলিং
    },
  });
};

// Delete Assets
const deleteAssets = async (id: string) => {
  return await prisma.assets.delete({
    where: { id },
  });
};

export const AssetsServices = {
  createAssetsDB,
  getAssetsDB,
  getAssetsID,
  updateAssets,
  deleteAssets,
};