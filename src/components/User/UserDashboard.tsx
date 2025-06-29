import { useExpenses } from "@/hooks/useExpenses";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function UserDashboard() {
  // Fetch data
  const { data: expenses, isLoading: loadingExpenses } = useExpenses();

  // Calculate summary
  const totalSpent = useMemo(
    () => expenses?.reduce((sum, e) => sum + (e.amount || 0), 0) ?? 0,
    [expenses]
  );
  const monthlySpent = useMemo(() => {
    if (!expenses) return 0;
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + (e.amount || 0), 0);
  }, [expenses]);

  // Recent expenses (last 5)
  const recentExpenses = useMemo(
    () =>
      expenses
        ? [...expenses]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5)
        : [],
    [expenses]
  );

  // Expenses by date for line chart
  const expensesByDate = useMemo(() => {
    if (!expenses) return [];
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const date = new Date(e.date).toLocaleDateString();
      map.set(date, (map.get(date) || 0) + e.amount);
    });
    return Array.from(map.entries())
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [expenses]);

  // Expenses by category for pie chart
  const expensesByCategory = useMemo(() => {
    if (!expenses) return [];
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const cat = e.category?.category_name || "Other";
      map.set(cat, (map.get(cat) || 0) + e.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  // Expenses by month for bar chart
  const expensesByMonth = useMemo(() => {
    if (!expenses) return [];
    const map = new Map<string, number>();
    expenses.forEach((e) => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map.set(key, (map.get(key) || 0) + e.amount);
    });
    return Array.from(map.entries())
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [expenses]);

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-5xl mx-auto">
      {/* Summary Cards */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col xs:flex-row gap-4 w-full">
          <div className="bg-blue-100 text-blue-700 rounded-lg px-4 py-2 text-center shadow flex-1 min-w-[140px]">
            <div className="text-xs uppercase">Total Spent</div>
            <div className="text-xl font-bold break-words">KSh {totalSpent.toLocaleString()}</div>
          </div>
          <div className="bg-yellow-100 text-yellow-700 rounded-lg px-4 py-2 text-center shadow flex-1 min-w-[140px]">
            <div className="text-xs uppercase">This Month</div>
            <div className="text-xl font-bold break-words">KSh {monthlySpent.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 mb-8">
        {/* Line Chart: Expenses Over Time */}
        <div className="bg-white rounded-lg shadow p-2 xs:p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-blue-700">Expenses Over Time</h2>
          <div className="w-full h-[180px] xs:h-[220px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expensesByDate} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={9} />
                <YAxis fontSize={9} />
                <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart: Expenses by Category */}
        <div className="bg-white rounded-lg shadow p-2 xs:p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-blue-700">Expenses by Category</h2>
          <div className="w-full h-[180px] xs:h-[220px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  fill="#8884d8"
                  label={({ name }) => name.length > 10 ? name.slice(0, 10) + "…" : name}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Bar Chart: Monthly Expenses */}
      <div className="bg-white rounded-lg shadow p-2 xs:p-4 sm:p-6 mb-8">
        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-blue-700">Monthly Expenses</h2>
        <div className="w-full h-[180px] xs:h-[220px] sm:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expensesByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={9} />
              <YAxis fontSize={9} />
              <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Expenses */}
      <div className="bg-white rounded-lg shadow p-2 xs:p-4 sm:p-6 mb-8 overflow-x-auto">
        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-blue-700">Recent Expenses</h2>
        {loadingExpenses ? (
          <div className="text-gray-500">Loading...</div>
        ) : recentExpenses.length === 0 ? (
          <div className="text-gray-400">No expenses yet.</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm min-w-[400px]">
              <thead>
                <tr className="text-xs text-gray-500 uppercase border-b">
                  <th className="py-2 min-w-[80px]">Date</th>
                  <th className="py-2 min-w-[80px]">Category</th>
                  <th className="py-2 min-w-[120px]">Description</th>
                  <th className="py-2 min-w-[80px]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((e) => (
                  <tr key={e.expense_id} className="border-b last:border-0 hover:bg-blue-50 transition">
                    <td className="py-2">{new Date(e.date).toLocaleDateString()}</td>
                    <td className="py-2">{e.category?.category_name || "-"}</td>
                    <td className="py-2">{e.description}</td>
                    <td className="py-2 font-semibold text-blue-700">KSh {e.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Responsive tweaks */}
      <style>
        {`
          @media (max-width: 640px) {
            .recharts-legend-item-text {
              font-size: 10px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default UserDashboard;