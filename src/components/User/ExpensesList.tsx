import { useExpenses, useCreateExpense, useUpdateExpense, useDeleteExpense } from "@/hooks/useExpenses";
import type { TExpense, TCategory } from "@/types/types";
import { useMemo, useState } from "react";
import z from "zod";
import GenericForm, { type FieldConfig } from "../constants/GlobalForm";

function ExpensesList() {
    const { data: expenses, isLoading } = useExpenses();
    const createExpense = useCreateExpense();
    const updateExpense = useUpdateExpense();
    const deleteExpense = useDeleteExpense();

    const [showForm, setShowForm] = useState(false);
    const [editExpense, setEditExpense] = useState<TExpense | null>(null);

    // For demo: categories list. Replace with real categories if available.
    const categories: TCategory[] = [
        { category_id: "1", category_name: "Food" },
        { category_id: "2", category_name: "Transport" },
        { category_id: "3", category_name: "Shopping" },
        { category_id: "4", category_name: "Other" },
    ];

    // Zod schema for validation
    const expenseSchema = z.object({
        category_id: z.string().min(1, "Category required"),
        amount: z.coerce.number().min(1, "Amount required"),
        date: z.string().min(1, "Date required"),
        description: z.string().min(1, "Description required"),
        user: z.string().optional(),
    });

    // Fields for GenericForm
    const expenseFields: FieldConfig<z.infer<typeof expenseSchema>>[] = [
        {
            name: "category_id",
            label: "Category",
            type: "select",
            options: categories.map((c) => ({ label: c.category_name, value: c.category_id })),
            placeholder: "Select category",
        },
        {
            name: "amount",
            label: "Amount (KSh)",
            type: "text",
            placeholder: "Enter amount",
        },
        {
            name: "date",
            label: "Date",
            type: "date",
            placeholder: "Select date",
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "Enter description",
        },
    ];

    // Handle form submit
    function handleSubmit(data: z.infer<typeof expenseSchema>) {
        if (editExpense) {
            updateExpense.mutate(
                { ...editExpense, ...data, category: categories.find((c) => c.category_id === data.category_id) || editExpense.category },
                {
                    onSuccess: () => {
                        setShowForm(false);
                        setEditExpense(null);
                    },
                }
            );
        } else {
            createExpense.mutate(
                {
                    ...data,
                    expense_id: Math.random().toString(), // For demo, backend should generate
                    category: categories.find((c) => c.category_id === data.category_id)!,
                } as TExpense,
                {
                    onSuccess: () => setShowForm(false),
                }
            );
        }
    }

    // Handle delete
    function handleDelete(id: string) {
        if (window.confirm("Delete this expense?")) {
            deleteExpense.mutate(id);
        }
    }

    // Prepare table data
    const tableData = useMemo(
        () =>
            expenses?.map((e) => ({
                ...e,
                category_name: e.category?.category_name || "-",
            })) || [],
        [expenses]
    );

    return (
        <div className="p-2 sm:p-6 max-w-full sm:max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-700">My Expenses</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                    onClick={() => {
                        setEditExpense(null);
                        setShowForm(true);
                    }}
                >
                    Add Expense
                </button>
            </div>
            <div className="bg-white rounded-lg shadow p-2 sm:p-4 overflow-x-auto">
                {isLoading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : tableData.length === 0 ? (
                    <div className="text-gray-400">No expenses found.</div>
                ) : (
                    <>
                        {/* Table for medium and up */}
                        <table className="w-full text-left min-w-[600px] hidden sm:table">
                            <thead>
                                <tr className="text-xs text-gray-500 uppercase border-b">
                                    <th className="py-2">Date</th>
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Description</th>
                                    <th className="py-2">Amount</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((e) => (
                                    <tr key={e.expense_id} className="border-b last:border-0 hover:bg-blue-50 transition">
                                        <td className="py-2">{new Date(e.date).toLocaleDateString()}</td>
                                        <td className="py-2">{e.category_name}</td>
                                        <td className="py-2">{e.description}</td>
                                        <td className="py-2 font-semibold text-blue-700">KSh {e.amount.toLocaleString()}</td>
                                        <td className="py-2 flex flex-col sm:flex-row gap-2">
                                            <button
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                                onClick={() => {
                                                    setEditExpense(e);
                                                    setShowForm(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(e.expense_id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Card layout for small screens */}
                        <div className="flex flex-col gap-3 sm:hidden">
                            {tableData.map((e) => (
                                <div key={e.expense_id} className="border rounded-lg p-3 shadow-sm bg-blue-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString()}</span>
                                        <span className="text-xs bg-blue-200 text-blue-700 px-2 py-0.5 rounded">{e.category_name}</span>
                                    </div>
                                    <div className="font-semibold text-blue-700 mb-1">KSh {e.amount.toLocaleString()}</div>
                                    <div className="text-gray-700 text-sm mb-2">{e.description}</div>
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => {
                                                setEditExpense(e);
                                                setShowForm(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => handleDelete(e.expense_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => {
                                setShowForm(false);
                                setEditExpense(null);
                            }}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">{editExpense ? "Edit Expense" : "Add Expense"}</h3>
                        <GenericForm
                            schema={expenseSchema}
                            fields={expenseFields}
                            onSubmit={handleSubmit}
                            initialValues={
                                editExpense
                                    ? {
                                          ...editExpense,
                                          category_id: editExpense.category?.category_id,
                                      }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExpensesList;