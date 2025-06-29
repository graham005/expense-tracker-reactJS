import { useCreateUser, useUpdateUser, useUsers } from "@/hooks/useUsers";
import type { TUser } from "@/types/types";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useMemo, useState } from "react";
import z from "zod";
import GenericForm, { type FieldConfig } from "../../constants/GlobalForm.tsx"; // Adjust the import based on your file structure

function UserList() {
    const { data: userData, error } = useUsers();
    const [showUserForm, setShowUserForm] = useState(false);
    const [editUser, setEditUser] = useState<TUser | null>(null);
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();

    const userSchema = z.object({
        username: z.string().min(2, "Username required"),
        email: z.string().email("Invalid email"),
        role: z.string().min(1, "Role required"),
        password: z.string().min(6, "Password required"),
    });

    const userFields: FieldConfig<UserData>[] = [
        { name: "username", label: "Username", type: "text", placeholder: "Enter username" },
        { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
        { 
            name: "role", 
            label: "Role", 
            type: "select", 
            options: [
                { label: "ADMIN", value: "ADMIN" },
                { label: "USER", value: "USER" }
            ],
            placeholder: "Select role"
        },
        { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
    ];
    if (error) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="text-red-500 text-lg font-semibold">
                    Error: {error.message || String(error)}
                </div>
            </div>
        );
    }

    const filteredUserData = useMemo(() => ({
        nodes: userData
            ? userData.map((user) => ({
                ...user,
                id: user.user_id,
            }))
            : [],
    }), [userData]);

    const pagination = usePagination(filteredUserData, {
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
            renderCell: (item: TUser) => item.user_id.toString(),
            sort: { sortKey: "ID" },
        },
        {
            label: "USERNAME",
            renderCell: (item: TUser) => (
                <div className="max-w-xs truncate" title={item.username}>
                    {item.username}
                </div>
            ),
            sort: { sortKey: "USERNAME" },
        },
        {
            label: "EMAIL",
            renderCell: (item: TUser) => (
                <div className="max-w-xs truncate" title={item.email}>
                    {item.email}
                </div>
            ),
            sort: { sortKey: "EMAIL" },
        },
        {
            label: "ROLE",
            renderCell: (item: TUser) => (
                <div className="max-w-xs truncate" title={item.role}>
                    {item.role}
                </div>
            ),
            sort: { sortKey: "ROLE" },
        },
    ];

    type UserData = {
        username: string;
        email: string;
        role: string;
        password: string;
    }

    function handleUserSubmit(data: UserData) {
        if (editUser) {
            updateUserMutation.mutate(
                { ...editUser, ...data },
                {
                    onSuccess: () => {
                        setShowUserForm(false);
                        setEditUser(null);
                    },
                }
            );
        } else {
            createUserMutation.mutate(
                data as TUser,
                {
                    onSuccess: () => {
                        setShowUserForm(false);
                        setEditUser(null);
                    },
                }
            );
        }
        setShowUserForm(false);
        setEditUser(null);
    }

    return (
        <div className="p-8 max-w-9xl mx-auto">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">User List</h2>
                <button
                    className="mb-8 bg-blue-600 p-2 font-mono font-bold text-white rounded-lg hover:bg-blue-700"
                    onClick={() => {
                        setEditUser(null);
                        setShowUserForm(true);
                    }}
                >
                    Add User
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto p-4 ">
                <CompactTable
                    columns={[
                        ...COLUMNS,
                        {
                            label: "ACTIONS",
                            renderCell: (item: TUser) => (
                                <div className="flex gap-2">
                                    <button
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mt-3 mb-3"
                                        title="Edit"
                                        onClick={() => {
                                            setEditUser(item);
                                            setShowUserForm(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mt-3 mb-3"
                                        title="Delete"
                                        onClick={() => {/* handle delete here */ }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ),
                        },
                    ]}
                    data={{ nodes: userData ?? [] }}
                    theme={{
                        Table: "min-w-full divide-y divide-gray-200",
                        HeaderRow: "",
                        HeaderCell:
                            "px-8 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                        Row: "even:bg-gray-50 hover:bg-blue-50 transition",
                        Cell: "px-8 py-80 whitespace-nowrap text-lg text-gray-700 ",
                    }}
                    pagination={pagination}
                />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                    Total Pages: {pagination.state.getTotalPages(filteredUserData.nodes)} |
                    Showing {filteredUserData.nodes.length} of {(userData?.length ?? 0)} posts
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Page:</span>
                    <div className="flex gap-1 ">
                        {pagination.state.getPages(filteredUserData.nodes).map((_: unknown, index: number) => (
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
            {showUserForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                            onClick={() => {
                                setShowUserForm(false);
                                setEditUser(null);
                            }}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">{editUser ? "Edit User" : "Add User"}</h3>
                        <GenericForm
                            schema={userSchema}
                            fields={userFields}
                            onSubmit={handleUserSubmit}
                            initialValues={editUser || undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserList;