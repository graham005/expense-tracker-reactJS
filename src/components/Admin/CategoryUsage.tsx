import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { Cell, Pie, ResponsiveContainer, PieChart as RePieChart, Legend, Tooltip } from "recharts"

function CategoryUsage() {
    const {categoryCount } = useAdminDashboard();
    
    const pieData = Object.entries(categoryCount).map(([name, value]) => ({
        name,
        value,
    }))

    const COLORS = [
  "#4CAF50", "#FF9800", "#2196F3", "#E91E63", "#9C27B0", "#FFC107", "#00BCD4", "#8BC34A"
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