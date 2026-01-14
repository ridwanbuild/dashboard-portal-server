import { prisma } from "../../lib/prisma";

// modules/user.router/getUsers.ts
export async function getAllUserForAdmin() {
  try {
    const users = await prisma.user.findMany({
      include: {
        employeeProfile: true,
        assets: true,
        agreement: true,
        happinessMessages: true,
        _count: { 
          select: { assets: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    
    return { success: true, data: users }; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Could not fetch users" };
  }
}