import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

/**
 * 1. Create a brand new employee account and their profile simultaneously
 */
const createEmployeeDB = async (payload: any) => {
  const { name, email, role, departments, age, salary, phone, address } = payload;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("A user with this email already exists!");
  }

  // Hash password manually because we are bypassing the standard Better Auth sign-up flow
  const hashedPassword = await bcrypt.hash("Welcome2026!", 10);

  // Creating User and Profile in a single transaction
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE",
      emailVerified: true,
      employeeProfile: {
        create: {
          departments,
          age,
          salary,
          phone,
          address,
        },
      },
    },
    include: {
      employeeProfile: true, 
    },
  });
};

/**
 * 2. Get All or Single Employee with their Profile
 */
const getEmployeeDB = async (user: any) => {
  if (user.role === "ADMIN") {
    return await prisma.user.findMany({
      include: { employeeProfile: true }
    });
  }

  return await prisma.user.findUnique({
    where: { id: user.id },
    include: { employeeProfile: true }
  });
};

/**
 * 3. Get Employee by ID (Specifically for Admin/Manager view)
 */
const getEmployeeID = async (id: string, user: any) => {
  // 1. If Admin, find by requested ID only
  if (user.role === "ADMIN") {
    return await prisma.user.findUnique({
      where: { id },
      include: { employeeProfile: true },
    });
  }

  // 2. If Employee, ensure they can only fetch if ID matches their session ID
  return await prisma.user.findFirst({
    where: {
      AND: [
        { id: id },
        { id: user.id } // This ensures a normal user can only see their own data
      ]
    },
    include: { employeeProfile: true },
  });
};


/**
 * 4. Update Employee (Handles both User and Profile updates)
 */
const updateEmployee = async (id: string, payload: any) => {
  const { name, role, banned, ...profileData } = payload;

  return await prisma.user.update({
    where: { id },
    data: {
      name,
      role,
      banned,
      employeeProfile: {
        update: {
          ...profileData,
        },
      },
    },
    include: {
      employeeProfile: true,
    },
  });
};

/**
 * 5. Delete Employee (Cascade delete handles Profile)
 */
const deleteEmployee = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const EmployeeServices = {
  createEmployeeDB,
  getEmployeeDB,
  getEmployeeID,
  updateEmployee,
  deleteEmployee,
};