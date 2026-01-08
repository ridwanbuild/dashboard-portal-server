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

// UPDATE: user আর্গুমেন্ট রিসিভ করার জন্য (user: any) যোগ করা হয়েছে
const getAssetsDB = async (user: any) => {
  // যদি রোল ADMIN হয়, তবে সব এসেট রিটার্ন করবে
  if (user.role === "ADMIN") {
    return await prisma.assets.findMany();
  }

  // যদি ADMIN না হয়, তবে শুধু ওই ইউজারের সাথে যুক্ত এসেট ফিল্টার করবে
  return await prisma.assets.findMany({
    where: {
      userId: user.id, // আপনার Schema অনুযায়ী যদি field name অন্য হয় তবে সেটি দিন
    },
  });
};

// UPDATE: সেশন ইউজার অনুযায়ী সিঙ্গেল ডাটা ফিল্টার
const getAssetsID = async (id: string, user: any) => {
  if (user.role === "ADMIN") {
    return await prisma.assets.findUnique({
      where: { id },
    });
  }

  // সাধারণ ইউজার হলে আইডি এবং ইউজার আইডি উভয়ই মিলতে হবে
  return await prisma.assets.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
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