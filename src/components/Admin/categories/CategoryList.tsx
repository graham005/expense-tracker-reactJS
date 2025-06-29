import { useCategories, useCreateCategory, useUpdateCategory } from "@/hooks/useCategory";
import type { TCategory, TCategoryUsageReport } from "@/types/types";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useMemo, useState } from "react";
import z from "zod";
import GenericForm, { type FieldConfig } from "../../constants/GlobalForm.tsx"; // Adjust the import based on your file structure
import { useCategoryUsageReport } from "@/hooks/useReport.ts";


function CategoryList() {
    const { data: categoryData, error } = useCategories();
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editCategory, setEditCategory] = useState<TCategory | null>(null);
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();
    const { data: usageData, isLoading: loadingUsage } = useCategoryUsageReport();
    if (error) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="text-red-500 bg-red-100 px-4 py-2 rounded shadow">
                    Error: {error.message || String(error)}
                </div>
            </div>
        );
    }

    const categorySchema = z.object({
        category_name: z.string().min(2, "Category name required"),
    });

    const categoryFields: FieldConfig<{ category_name: string }>[] = [
        { name: "category_name", label: "Category Name", type: "text", placeholder: "Enter category name" },
    ];

    const filteredCategoryData = useMemo(() => ({
        nodes: categoryData
            ? categoryData.map((category) => ({
                ...category,
                id: category.category_id,
            }))
            : [],
    }), [categoryData]);

    const pagination = usePagination(filteredCategoryData, {
        state: {
            page: 0,
            size: 10,
        },
        onChange: onPaginationChange,
    })

    function onPaginationChange(action: unknown, state: unknown) {
        console.log(action, state)
    }

    const COLUMNS = [
        {
            label: "ID",
            renderCell: (item: TCategory) => item.category_id.toString(),
            sort: { sortKey: "ID" },
        },
        {
            label: "Category Name",
            renderCell: (item: TCategory) => (
                <div className="max-w-xs truncate" title={item.category_name}>
                    {item.category_name}
                </div>
            ),
            sort: { sortKey: "Category Name" },
        },
    ];

    function handleCategorySubmit(data: { category_name: string }) {
        if (editCategory) {
            updateCategoryMutation.mutate(
                { ...editCategory, ...data },
                {
                    onSuccess: () => {
                        setShowCategoryForm(false);
                        setEditCategory(null);
                    },
                }
            );
        } else {
            createCategoryMutation.mutate(
                data as TCategory,
                {
                    onSuccess: () => {
                        setShowCategoryForm(false);
                        setEditCategory(null);
                    },
                }
            );
        }
        setShowCategoryForm(false);
        setEditCategory(null);
    }

    // Calculate the maximum usage count across all categories for scaling
    const maxUsage = useMemo(() => {
        if (!usageData || !Array.isArray(usageData)) return 1;
        return Math.max(...usageData.map((c: TCategoryUsageReport) => Number(c.usage_count) || 0), 1);
    }, [usageData]);


    return (
        <div className="mt-6 bg-white p-4 sm:p-6 rounded ">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Category List</h2>
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded w-full sm:w-auto"
                    onClick={() => {
                        setEditCategory(null);
                        setShowCategoryForm(true);
                    }}
                >
                    Add New Category
                </button>
            </div>
            <div className="mt-4">
                <div className="overflow-x-auto rounded shadow p-2 sm:p-5 max-w-full">
                    <CompactTable
                        columns={[
                            ...COLUMNS,
                            {
                                label: "Actions",
                                renderCell: (item: TCategory) => (
                                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm mt-0.5 mb-0.5"
                                            onClick={() => {
                                                setEditCategory(item);
                                                setShowCategoryForm(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm mt-0.5 mb-0.5"
                                            onClick={() => {
                                                // handle delete logic here
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        data={{ nodes: categoryData ?? [] }}
                        theme={{
                            Table: `min-w-full border border-gray-200 text-xs sm:text-sm`,
                            HeaderRow: `bg-gray-100`,
                            HeaderCell: `px-2 sm:px-4 py-2 font-bold text-gray-700 border-b border-gray-200`,
                            Row: `hover:bg-green-50`,
                            Cell: `px-2 sm:px-4 py-2 border-b border-gray-100 text-gray-700`,
                        }}
                        pagination={pagination}
                    />
                </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                    Total Pages: {pagination.state.getTotalPages(filteredCategoryData.nodes)} |
                    Showing {filteredCategoryData.nodes.length} of {(categoryData?.length ?? 0)} posts
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Page:</span>
                    <div className="flex gap-1 ">
                        {pagination.state.getPages(filteredCategoryData.nodes).map((_: unknown, index: number) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => pagination.fns.onSetPage(index)}
                                className={`px-3 py-1 text-sm rounded transition-colors ${pagination.state.page === index
                                    ? 'bg-blue-500 text-white font-semibold'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {showCategoryForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => {
                                setShowCategoryForm(false);
                                setEditCategory(null);
                            }}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">{editCategory ? "Edit Category" : "Add Category"}</h3>
                        <GenericForm
                            schema={categorySchema}
                            fields={categoryFields}
                            onSubmit={handleCategorySubmit}
                            initialValues={editCategory || undefined}
                        />
                    </div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4 text-blue-700">Category Usage</h2>
                {loadingUsage ? (
                    <div className="text-gray-500">Loading...</div>
                ) : !usageData || (Array.isArray(usageData) && usageData.length === 0) ? (
                    <div className="text-gray-400">No usage data available.</div>
                ) : (
                    <div className="space-y-4">
                        {(Array.isArray(usageData) ? usageData : [usageData]).map((cat) => {
                            const usage = Number(cat.usage_count) || 0;
                            const percent = maxUsage > 0 ? (usage / maxUsage) * 100 : 0;
                            return (
                                <div key={cat.category_id} className="flex items-center gap-4">
                                    <span className="w-32 truncate">{cat.category_name}</span>
                                    <div className="flex-1 max-w-md bg-gray-200 rounded h-4 relative">
                                        <div
                                            className="bg-blue-500 h-4 rounded absolute left-0 top-0 transition-all"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <span className="ml-2 text-sm text-gray-700 font-semibold">{usage}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CategoryList;