import express from "express";
const router = express.Router();
import { saveAuditTrail } from "../controllers/auditTrailController.js";

router.post("/saveAuditTrail", saveAuditTrail);

export default router;
