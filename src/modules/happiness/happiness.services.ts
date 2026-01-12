import { prisma } from "../../lib/prisma";

// Create new post
const createMessageDB = async (
  postData: {
    title: string;
    message: string;
    userId?: string;
    department: string;
  },
  user: any
) => {
  // UPDATE: Automatically link the message to the logged-in user's ID
  const result = await prisma.happinessMessage.create({
    data: {
      ...postData,
      userId: user.id, // Ensuring the message belongs to the sender
    },


    
  });
  return result;
};

// Get all data based on roles
const getAllMessageDB = async (user: any) => {
  // UPDATE: Admin can see all messages
  if (user.role === "ADMIN") {
    return await prisma.happinessMessage.findMany({
      include: {
        // user: true, // Uncomment if you want to see sender details
      },
    });
  }

  // UPDATE: Non-admin users (Manager/Employee) see only their own messages
  return await prisma.happinessMessage.findMany({
    where: {
      userId: user.id,
    },
  });
};

// Get single data by id with security check
const getSingleMessageDB = async (id: string, user: any) => {
  // UPDATE: Admin can fetch any message by ID
  if (user.role === "ADMIN") {
    return await prisma.happinessMessage.findUnique({
      where: { id },
    });
  }

  // UPDATE: Regular users can only fetch the message if it belongs to them
  return await prisma.happinessMessage.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
  });
};

// Update message
const updateMessageDB = async (id: string, payload: any) => {
  // Logic remains same as access is controlled at the Route level (Admin only)
  return await prisma.happinessMessage.update({
    where: { id },
    data: payload,
  });
};

// Delete message
const deleteMessageDB = async (id: string) => {
  // Logic remains same as access is controlled at the Route level (Admin only)
  return await prisma.happinessMessage.delete({
    where: { id },
  });
};

export const HappinessServices = {
  createMessageDB,
  getAllMessageDB,
  getSingleMessageDB,
  updateMessageDB,
  deleteMessageDB,
};
