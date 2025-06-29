import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { Cell, Pie, ResponsiveContainer, PieChart as RePieChart, Legend, Tooltip } from "recharts"

function CategoryUsage() {
    const {categoryCount } = useAdminDashboard();
    
    const pieData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
    }))

    const COLORS = [
  "#558C03", "#98BF0A", "#265902", "#f2ffbf", "#e6ff80", "#FFC107", "#00BCD4", "#8BC34A"
]

const renderLabel = (entry: any) => entry.name;
  return (
    <div className="w-full h-70 flex items-center justify-center">
        {pieData.length === 0 ? (
            <span className="text-gray-400">No data</span>
        ): (
            <ResponsiveContainer width="100%" height={400}>
                <RePieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={renderLabel}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </RePieChart>
            </ResponsiveContainer>
        )}
    </div>
  )
}

export default CategoryUsage