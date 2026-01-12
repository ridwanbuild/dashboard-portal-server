import express from "express";

import middleAuth, { UserRole } from "../../middleware/middleware";
import { employeeControlled } from "./employee.controller";

const router = express.Router();

// Create an Employee
router.post("/", middleAuth(UserRole.ADMIN), employeeControlled.createEmployee);

// Get all Employees
router.get("/", middleAuth(UserRole.ADMIN), employeeControlled.getEmployee);

// Get a single Employee by ID
router.get("/:id", middleAuth(UserRole.ADMIN, UserRole.MANAGER), employeeControlled.getSingleData);


// Update an Employee (Changed to PATCH) 
router.patch("/:id", middleAuth(UserRole.ADMIN, UserRole.MANAGER), employeeControlled.updateEmployee);

// Delete an Employee (Changed to DELETE) 
router.delete("/:id", middleAuth(UserRole.ADMIN), employeeControlled.deleteEmployee);


export const EmployeeRoutes = router;