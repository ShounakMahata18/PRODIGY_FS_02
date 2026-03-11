import { Router } from "express";

import {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.put("/:email", updateEmployee);
router.delete("/:email", deleteEmployee);

export default router;
