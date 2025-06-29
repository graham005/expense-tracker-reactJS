import {
    useDailySummaryReport,
    useMonthlySummaryReport,
    useYearlySummaryReport,
    useDailyReport,
    useMonthlyReport,
    useYearlyReport,
} from "@/hooks/useReport";
import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Report() {
    // Tab state
    const [tab, setTab] = useState<'daily' | 'monthly' | 'yearly'>("monthly");
    // Date pickers
    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(String(now.getMonth() + 1).padStart(2, "0"));
    const [selectedYear, setSelectedYear] = useState(String(now.getFullYear()));

    // Data hooks
    const { data: dailySummary, isLoading: loadingDaily } = useDailySummaryReport(selectedDate);
    const { data: monthlySummary, isLoading: loadingMonthly } = useMonthlySummaryReport(selectedMonth, selectedYear);
    const { data: yearlySummary, isLoading: loadingYearly } = useYearlySummaryReport(selectedYear);
    const { data: dailyReport } = useDailyReport(selectedDate);
    const { data: monthlyReport } = useMonthlyReport(selectedMonth, selectedYear);
    const { data: yearlyReport } = useYearlyReport(selectedYear);

    // Helper: format month for display
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Prepare chart data
    const monthlyBarData = Array.isArray(monthlyReport)
        ? monthlyReport.map((r: any) => ({
                date: new Date(r.expense.date).toLocaleDateString(),
                amount: r.expense.amount,
                category: r.expense.category?.category_name || "Other",
            }))
        : [];
    const yearlyBarData = Array.isArray(yearlyReport)
        ? yearlyReport.map((r: any) => {
                const d = new Date(r.expense.date);
                return {
                    month: monthNames[d.getMonth()],
                    amount: r.expense.amount,
                    category: r.expense.category?.category_name || "Other",
                };
            })
        : [];
    // Pie data for yearly
    const yearlyPieData = yearlyBarData.reduce((acc: any[], curr) => {
        const found = acc.find((a) => a.name === curr.category);
        if (found) found.value += curr.amount;
        else acc.push({ name: curr.category, value: curr.amount });
        return acc;
    }, []);

    return (
        <div className="p-2 sm:p-6 max-w-full sm:max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 sm:mb-6 text-center sm:text-left">Expense Reports</h1>
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-8 justify-center sm:justify-start">
                <button
                    className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all text-sm sm:text-base ${tab === "daily" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-gray-500 bg-gray-100 hover:bg-blue-50"}`}
                    onClick={() => setTab("daily")}
                >
                    Daily
                </button>
                <button
                    className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all text-sm sm:text-base ${tab === "monthly" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-gray-500 bg-gray-100 hover:bg-blue-50"}`}
                    onClick={() => setTab("monthly")}
                >
                    Monthly
                </button>
                <button
                    className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all text-sm sm:text-base ${tab === "yearly" ? "border-blue-600 text-blue-700 bg-blue-50" : "border-transparent text-gray-500 bg-gray-100 hover:bg-blue-50"}`}
                    onClick={() => setTab("yearly")}
                >
                    Yearly
                </button>
            </div>
            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow p-2 sm:p-6">
                {tab === "daily" && (
                    <>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 items-center">
                            <label className="font-semibold">Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border rounded px-2 sm:px-3 py-1 w-full sm:w-auto"
                            />
                        </div>
                        {loadingDaily ? (
                            <div className="text-gray-500">Loading daily summary...</div>
                        ) : dailySummary ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <div className="bg-blue-100 text-blue-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Total Spent</div>
                                    <div className="text-lg sm:text-xl font-bold">KSh {dailySummary.totalAmount.toLocaleString()}</div>
                                </div>
                                <div className="bg-green-100 text-green-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Transactions</div>
                                    <div className="text-lg sm:text-xl font-bold">{dailySummary.totalCount}</div>
                                </div>
                            </div>
                        ) : null}
                        {/* Daily Line Chart */}
                        {Array.isArray(dailyReport) && dailyReport.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Expenses Trend</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={dailyReport.map((r: any) => ({
                                            time: new Date(r.expense.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                            amount: r.expense.amount,
                                        }))}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                        {/* Daily Pie Chart by Category */}
                        {Array.isArray(dailyReport) && dailyReport.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Category Breakdown</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie
                                                data={(() => {
                                                    const map = new Map();
                                                    dailyReport.forEach((r: any) => {
                                                        const cat = r.expense.category?.category_name || "Other";
                                                        map.set(cat, (map.get(cat) || 0) + r.expense.amount);
                                                    });
                                                    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
                                                })()}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {(() => {
                                                    const map = new Map();
                                                    dailyReport.forEach((r: any) => {
                                                        const cat = r.expense.category?.category_name || "Other";
                                                        map.set(cat, (map.get(cat) || 0) + r.expense.amount);
                                                    });
                                                    return Array.from(map.entries()).map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ));
                                                })()}
                                            </Pie>
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {tab === "monthly" && (
                    <>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 items-center">
                            <label className="font-semibold">Month:</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="border rounded px-2 sm:px-3 py-1 w-full sm:w-auto"
                            >
                                {monthNames.map((m, i) => (
                                    <option key={i} value={String(i + 1).padStart(2, "0")}>{m}</option>
                                ))}
                            </select>
                            <label className="font-semibold">Year:</label>
                            <input
                                type="number"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border rounded px-2 sm:px-3 py-1 w-full sm:w-24"
                                min="2000"
                                max={now.getFullYear()}
                            />
                        </div>
                        {loadingMonthly ? (
                            <div className="text-gray-500">Loading monthly summary...</div>
                        ) : monthlySummary ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <div className="bg-blue-100 text-blue-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Total Spent</div>
                                    <div className="text-lg sm:text-xl font-bold">KSh {monthlySummary.totalAmount.toLocaleString()}</div>
                                </div>
                                <div className="bg-green-100 text-green-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Transactions</div>
                                    <div className="text-lg sm:text-xl font-bold">{monthlySummary.totalCount}</div>
                                </div>
                                <div className="bg-yellow-100 text-yellow-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Average</div>
                                    <div className="text-lg sm:text-xl font-bold">KSh {monthlySummary.averageAmount.toLocaleString()}</div>
                                </div>
                            </div>
                        ) : null}
                        {/* Monthly Bar Chart */}
                        {monthlyBarData.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Expenses by Day</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={monthlyBarData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Bar dataKey="amount" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                        {/* Monthly Area Chart by Category */}
                        {monthlyBarData.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Category Breakdown</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <AreaChart data={monthlyBarData}>
                                            <defs>
                                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="date" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorAmount)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                        {/* Monthly Line Chart of Daily Totals */}
                        {monthlyBarData.length > 0 && (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Daily Total Trend</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={(() => {
                                            const map = new Map();
                                            monthlyBarData.forEach((d) => {
                                                map.set(d.date, (map.get(d.date) || 0) + d.amount);
                                            });
                                            return Array.from(map.entries()).map(([date, amount]) => ({ date, amount }));
                                        })()}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {tab === "yearly" && (
                    <>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 items-center">
                            <label className="font-semibold">Year:</label>
                            <input
                                type="number"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="border rounded px-2 sm:px-3 py-1 w-full sm:w-24"
                                min="2000"
                                max={now.getFullYear()}
                            />
                        </div>
                        {loadingYearly ? (
                            <div className="text-gray-500">Loading yearly summary...</div>
                        ) : yearlySummary ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                                <div className="bg-blue-100 text-blue-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Total Spent</div>
                                    <div className="text-lg sm:text-xl font-bold">KSh {yearlySummary.totalAmount.toLocaleString()}</div>
                                </div>
                                <div className="bg-green-100 text-green-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Transactions</div>
                                    <div className="text-lg sm:text-xl font-bold">{yearlySummary.totalCount}</div>
                                </div>
                                <div className="bg-yellow-100 text-yellow-700 rounded-lg px-2 sm:px-4 py-2 text-center shadow">
                                    <div className="text-xs uppercase">Average</div>
                                    <div className="text-lg sm:text-xl font-bold">KSh {yearlySummary.averageAmount.toLocaleString()}</div>
                                </div>
                            </div>
                        ) : null}
                        {/* Yearly Line Chart */}
                        {yearlyBarData.length > 0 ? (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Monthly Trend</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={yearlyBarData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">No data for monthly trend.</div>
                        )}
                        {/* Yearly Pie Chart by Category */}
                        {yearlyBarData.length > 0 ? (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Category Breakdown</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <PieChart>
                                            <Pie
                                                data={(() => {
                                                    const map = new Map();
                                                    yearlyBarData.forEach((d) => {
                                                        map.set(d.category, (map.get(d.category) || 0) + d.amount);
                                                    });
                                                    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
                                                })()}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            >
                                                {(() => {
                                                    const map = new Map();
                                                    yearlyBarData.forEach((d) => {
                                                        map.set(d.category, (map.get(d.category) || 0) + d.amount);
                                                    });
                                                    return Array.from(map.entries()).map((_, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ));
                                                })()}
                                            </Pie>
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">No data for category breakdown.</div>
                        )}
                        {/* Yearly Bar Chart of Monthly Totals */}
                        {yearlyBarData.length > 0 ? (
                            <div className="mb-6 sm:mb-8">
                                <h3 className="font-bold mb-2 text-blue-700 text-base sm:text-lg">Monthly Totals</h3>
                                <div className="w-full" style={{ minWidth: 0 }}>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={(() => {
                                            const map = new Map();
                                            yearlyBarData.forEach((d) => {
                                                map.set(d.month, (map.get(d.month) || 0) + d.amount);
                                            });
                                            return Array.from(map.entries()).map(([month, amount]) => ({ month, amount }));
                                        })()}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" fontSize={10} />
                                            <YAxis fontSize={10} />
                                            <Tooltip formatter={(value: number) => `KSh ${value.toLocaleString()}`} />
                                            <Bar dataKey="amount" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">No data for monthly totals.</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Report;