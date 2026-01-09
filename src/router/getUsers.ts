import { prisma } from "../lib/prisma";

export async function getAllUserForAdmin() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        departments: true,
        salary: true,
        banned: true,
        createdAt: true,
        image: true,
        _count: {
          select: {
            assets: true,
            happinessMessages: true,
            agreement: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Could not fetch users" };
  }
}
