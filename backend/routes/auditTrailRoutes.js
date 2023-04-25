import express from "express";
const router = express.Router();
import {
  auditExport,
  saveAuditTrail,
} from "../controllers/auditTrailController.js";

router.get("/auditExport", auditExport);
router.post("/saveAuditTrail", saveAuditTrail);

export default router;
