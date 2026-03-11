import { Request, Response } from "express";

import Employee from "../models/Employee";
import { employeeSchema } from "../config/zod";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const validation = employeeSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.error.format(),
            });
        }

        const existingEmployee = await Employee.findOne({
            email: validation.data.email,
        });

        if (existingEmployee) {
            return res.status(409).json({
                success: false,
                message: "Employee already exists",
            });
        }

        const employee = await Employee.create(validation.data);

        res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: employee,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { email: req.params.email }, // search by email
            req.body,
            { new: true }, // return updated document
        );

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }

        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findOneAndDelete({
            email: req.params.email,
        });

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }

        res.status(204).json({
            success: true,
            message: "Employee deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
