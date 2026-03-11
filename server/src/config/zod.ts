import { z } from "zod";

export const employeeSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    position: z.string().min(1, "Position is required"),
    department: z.string().min(1, "Department is required"),
    salary: z.number().min(0, "Salary must be positive"),
});
