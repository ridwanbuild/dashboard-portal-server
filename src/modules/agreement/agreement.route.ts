import express from "express";
import { AgreementControlled } from "./agreement.controller";
import middleAuth, { UserRole } from "../../middleware/middleware";


const router = express.Router();

// 1. Create Agreement: Usually restricted to Admin or specific roles
router.post(
  "/", 
  middleAuth(UserRole.ADMIN), 
  AgreementControlled.createAgreement
);

// 2. Get All Agreements: 
// Admin sees all, Employees/Managers see only their own
router.get(
  "/", 
  middleAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE), 
  AgreementControlled.getAgreement
);

// 3. Get Single Agreement: Secured by ownership check in controller/service
router.get(
  "/:id", 
  middleAuth(UserRole.ADMIN, UserRole.MANAGER, UserRole.EMPLOYEE), 
  AgreementControlled.getAgreementData
);

// 4. Update Agreement: Restricted to Admin
router.patch(
  "/:id", 
  middleAuth(UserRole.ADMIN), 
  AgreementControlled.updateAgreement
);

// 5. Delete Agreement: Restricted to Admin
router.delete(
  "/:id", 
  middleAuth(UserRole.ADMIN), 
  AgreementControlled.deleteAgreement
);

export const AgreementRoutes = router;