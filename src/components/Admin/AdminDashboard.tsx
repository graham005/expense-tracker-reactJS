import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import CategoryUsage from "./CategoryUsage"
import UserGrowth from "./UserGrowth"

function AdminDashboard() {
  const {
    totalUsers,
    totalCategories,
    totalAmount,
    avgExpensePerUser,
    recentTransactions,
    categoryBreakdown,
  } = useAdminDashboard()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 bg-green-50 min-h-screen">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          <span className="text-xs text-gray-500">Total Users</span>
          <span className="text-3xl font-bold">{totalUsers}</span>
          <span className="text-green-600 text-xs">+100% from last month</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          <span className="text-xs text-gray-500">Total Categories</span>
          <span className="text-3xl font-bold">{totalCategories}</span>
          <span className="text-green-600 text-xs">+0% from last month</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          <span className="text-xs text-gray-500">Total Expenses</span>
          <span className="text-3xl font-bold">KES {totalAmount.toLocaleString()}</span>
          <span className="text-green-600 text-xs">+0% from last month</span>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
          <span className="text-xs text-gray-500">Avg. Expense/User</span>
          <span className="text-3xl font-bold">KES {avgExpensePerUser}</span>
          <span className="text-red-600 text-xs">-0% from last month</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left column */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <span className="font-semibold">Categories Usage</span>
              <CategoryUsage />
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <span className="font-semibold">User Growth</span>
              <UserGrowth />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <span className="font-semibold text-lg">Expense Categories</span>
            <div className="mt-4">
              {Object.entries(categoryBreakdown).length === 0 ? (
                <span className="text-gray-400">No data</span>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {Object.entries(categoryBreakdown).map(([cat, amt]) => (
                    <li
                      key={cat}
                      className="flex justify-between items-center py-2 px-1 hover:bg-green-50 rounded transition"
                    >
                      <span className="text-gray-700">{cat}</span>
                      <span className="font-semibold text-green-700">
                        KES {amt.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Right column */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-lg">Recent Transactions</span>
            <span className="bg-green-700 text-white text-xs px-3 py-1 rounded-full font-medium">
              {recentTransactions.length} Recent
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 px-3 font-medium">User</th>
                  <th className="py-2 px-3 font-medium">Amount</th>
                  <th className="py-2 px-3 font-medium">Category</th>
                  <th className="py-2 px-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-6">
                      No transactions
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map(tx => (
                    <tr key={tx.expense_id} className="border-b hover:bg-green-50 transition">
                      <td className="py-2 px-3">{tx.user}</td>
                      <td className="py-2 px-3 text-green-700 font-semibold">
                        KES {Number(tx.amount).toLocaleString()}
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                          {tx.category || "Unknown"}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-500">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard