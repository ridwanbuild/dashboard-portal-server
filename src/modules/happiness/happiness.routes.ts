import express from "express";
import { HappinessController } from "./happiness.controller";
import middleAuth, { UserRole } from "../../middleware/middleware";


const router = express.Router();

// 1. Create a message: Allowed for all authenticated users (Admin, Manager, Employee)
router.post(
  "/", 
  middleAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE), 
  HappinessController.createMessage
);

// 2. Get all messages: 
// Admin sees everything, Manager sees team data, Employee sees only their own
router.get(
  "/", 
  middleAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE), 
  HappinessController.getAllMessage
);

// 3. Get a specific message: Requires authorization check in the controller/service
router.get(
  "/:id", 
  middleAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE), 
  HappinessController.getSingleMessage
);


// 4. Update or Delete: Restricted to Admin for global management
router.patch("/:id", middleAuth(UserRole.ADMIN), HappinessController.updateMessage);
router.delete("/:id", middleAuth(UserRole.ADMIN), HappinessController.deleteMessage);

export const HappinessRoutes = router;