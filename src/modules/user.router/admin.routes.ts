import express from 'express';

import { getAllUserForAdmin } from './getUsers';
import { prisma } from '../../lib/prisma';

const router = express.Router();

/**
 * 1. Fetch all users for the admin dashboard
 * Returns a list of all employees and their basic status
 */
router.get("/all-users", async (req, res) => {
  const result = await getAllUserForAdmin();
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

/**
 * 2. Update user permissions, role, or ban status
 * Endpoint: PATCH /admin/update-user/:id
 * This matches your latest schema fields: role, banned, banReason
 */
router.patch("/update-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role, banned, banReason } = req.body;

    // Performing the update operation in the database via Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        role,        // Options: ADMIN, MANAGER, EMPLOYEE
        banned,      // Boolean: true/false
        banReason,   // String: Explanation for the ban
      },
    });

    res.status(200).json({
      success: true,
      message: "User permissions updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Could not update user" });
  }
});


/**
 * 3. Permanently delete a user from the system
 * Endpoint: DELETE /admin/delete-user/:id
 * Note: Cascade delete is active (removes related Assets and Messages automatically)
 */
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user record from the 'user' table
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Employee records purged successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Action failed" });
  }
});

export const adminRouter = router;