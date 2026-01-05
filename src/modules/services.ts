import { prisma } from "../lib/prisma";

// create new post
const createPostIntoDB = async (postData: {
  title: string;
  message: string;
  userId?: string;
}) => {
  const result = await prisma.happinessMessage.create({
    data: postData,
  });
};

// get all data
const getAllMessageDB = async () => {
  return await prisma.happinessMessage.findMany();
};



const getSingleMessageDB = async (id: string ,) => {
  return await prisma.happinessMessage.findUnique({
    where: { id },
  });
};



const updateMessageDB = async (id: string, payload: any) => {
  return await prisma.happinessMessage.update({
    where: { id },
    data: payload
  });
};



const deleteMessageDB = async (id: string) => {
  return await prisma.happinessMessage.delete({
    where: { id },
  });
};

export const PostServices = {
  createPostIntoDB,
  getAllMessageDB,
  getSingleMessageDB,
  updateMessageDB,
  deleteMessageDB,
};
