import { useAdminDashboard } from "@/hooks/useAdminDashboard"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

function UserGrowth() {
    const {userGrowthData } = useAdminDashboard();
  return (
    <div className="w-full h-60 flex items-center justify-center">
        {userGrowthData.length === 0 ? (
            <span className="text-gray-400">No data</span>
        ) : (
            <ResponsiveContainer width="100%" height={200} >
                <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#4CAF50" strokeWidth={2} />
                    <Legend />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        )}
    </div>
  )
}

export default UserGrowth