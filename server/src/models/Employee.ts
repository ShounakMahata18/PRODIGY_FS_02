import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
    name: string;
    email: String;
    position: string;
    department: string;
    salary: number;
}

const employeeSchema = new Schema<IEmployee>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<IEmployee>("Employees", employeeSchema);
