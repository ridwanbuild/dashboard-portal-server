import { prisma } from "../../lib/prisma";

// create assets DB
const createAssetsDB = async (postData: {
  name: string;
  serialNo: string;
  userId?: string;
}) => {
  return await prisma.assets.create({
    data: postData,
  });

};


// GET assets db
const getAssetsDB = async () => {
  return await prisma.assets.findMany();

};

// Get assets single db
const getAssetsID = async (id: string) => {
  return await prisma.assets.findUnique({
    where: { id },
  });
};

// assets update
const updateAssets = async (id: string, payload: any) => {
  return await prisma.assets.update({
    where: { id },
    data: payload,
  });
};

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
