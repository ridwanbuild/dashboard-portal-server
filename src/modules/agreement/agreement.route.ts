import express from "express";
import { AgreementServices } from "./agreement.service";
import { AgreementControlled } from "./agreement.controller";



const router = express.Router();

router.post("/", AgreementControlled.createAgreement);
router.get("/", AgreementControlled.getAgreement);
router.get("/:id", AgreementControlled.getAgreementData);
router.post("/:id", AgreementControlled.updateAgreement);
router.post("/:id", AgreementControlled.deleteAgreement);


export const AgreementRoutes = router;
