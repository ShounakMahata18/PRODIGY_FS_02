import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";

interface Employee {
    name: string;
    email: string;
    position: string;
    department: string;
    salary: number;
}

export default function Dashboard() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const API = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("token");

    /* ---------------- FETCH EMPLOYEES ---------------- */

    const fetchEmployees = async () => {
        try {
            const res = await fetch(`${API}/api/employee`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await res.json();

            // correct parsing
            setEmployees(result.data || []);
        } catch (error) {
            console.error("Fetch employees error:", error);
        }
    };

    /* ---------------- CREATE EMPLOYEE ---------------- */

    const createEmployee = async (employee: Employee) => {
        try {
            const res = await fetch(`${API}/api/employee`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(employee),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.message || "Something went wrong");
                return;
            }

            fetchEmployees();
        } catch (error) {
            console.error("Create employee error:", error);
        }
    };

    /* ---------------- UPDATE EMPLOYEE ---------------- */

    const updateEmployee = async (employee: Employee) => {
        try {
            const res = await fetch(`${API}/api/employee/${employee.email}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(employee),
            });

            if (!res.ok) throw new Error("Update employee failed");

            fetchEmployees();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Update employee error:", error);
        }
    };

    /* ---------------- DELETE EMPLOYEE ---------------- */

    const deleteEmployee = async (email: string) => {
        try {
            const res = await fetch(`${API}/api/employee/${email}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Delete failed");

            setEmployees((prev) => prev.filter((emp) => emp.email !== email));
        } catch (error) {
            console.error("Delete employee error:", error);
        }
    };

    /* ---------------- FORM SUBMIT ---------------- */

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; // store reference first
        const formData = new FormData(form);

        const employee: Employee = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            position: formData.get("position") as string,
            department: formData.get("department") as string,
            salary: Number(formData.get("salary")),
        };

        await createEmployee(employee);

        form.reset(); // safe now
    };

    /* ---------------- INITIAL LOAD ---------------- */

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Navbar />

            <div className="flex-1 bg-gray-100 flex justify-center p-6">
                <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
                    {/* ---------------- CREATE EMPLOYEE ---------------- */}

                    <h2 className="text-xl font-semibold mb-6 text-center">
                        Create Employee
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-wrap gap-3 justify-center"
                    >
                        <input
                            name="name"
                            className="border rounded px-3 py-2 flex-1 min-w-[140px]"
                            placeholder="Name"
                        />

                        <input
                            name="email"
                            type="email"
                            className="border rounded px-3 py-2 flex-1 min-w-[180px]"
                            placeholder="Email"
                        />

                        <input
                            name="position"
                            className="border rounded px-3 py-2 flex-1 min-w-[140px]"
                            placeholder="Position"
                        />

                        <input
                            name="department"
                            className="border rounded px-3 py-2 flex-1 min-w-[140px]"
                            placeholder="Department"
                        />

                        <input
                            name="salary"
                            type="number"
                            className="border rounded px-3 py-2 flex-1 min-w-[120px]"
                            placeholder="Salary"
                        />

                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </form>

                    <hr className="my-6" />

                    {/* ---------------- EMPLOYEE TABLE ---------------- */}

                    <h2 className="text-xl font-semibold mb-6 text-center">
                        All Employees
                    </h2>

                    <div className="max-h-[400px] overflow-y-auto border rounded-lg">
                        <table className="w-full text-left">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Position</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">Salary</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {employees.map((emp) => (
                                    <tr
                                        key={emp.email}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3">{emp.name}</td>
                                        <td className="p-3">{emp.email}</td>
                                        <td className="p-3">{emp.position}</td>
                                        <td className="p-3">
                                            {emp.department}
                                        </td>
                                        <td className="p-3">{emp.salary}</td>

                                        <td className="p-3 flex justify-center gap-4">
                                            <FaEdit
                                                className="text-blue-500 cursor-pointer"
                                                onClick={() => {
                                                    setEditingEmployee(emp);
                                                    setIsModalOpen(true);
                                                }}
                                            />

                                            <FaTrash
                                                className="text-red-500 cursor-pointer"
                                                onClick={() =>
                                                    deleteEmployee(emp.email)
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ---------------- UPDATE MODAL ---------------- */}

            {isModalOpen && editingEmployee && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Update Employee
                        </h2>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateEmployee(editingEmployee);
                            }}
                            className="flex flex-col gap-3"
                        >
                            <input
                                className="border p-2 rounded"
                                value={editingEmployee.name}
                                onChange={(e) =>
                                    setEditingEmployee({
                                        ...editingEmployee,
                                        name: e.target.value,
                                    })
                                }
                            />

                            <input
                                className="border p-2 rounded bg-gray-100"
                                value={editingEmployee.email}
                                disabled
                            />

                            <input
                                className="border p-2 rounded"
                                value={editingEmployee.position}
                                onChange={(e) =>
                                    setEditingEmployee({
                                        ...editingEmployee,
                                        position: e.target.value,
                                    })
                                }
                            />

                            <input
                                className="border p-2 rounded"
                                value={editingEmployee.department}
                                onChange={(e) =>
                                    setEditingEmployee({
                                        ...editingEmployee,
                                        department: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                className="border p-2 rounded"
                                value={editingEmployee.salary}
                                onChange={(e) =>
                                    setEditingEmployee({
                                        ...editingEmployee,
                                        salary: Number(e.target.value),
                                    })
                                }
                            />

                            <div className="flex justify-between mt-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-3 py-2 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-3 py-2 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
