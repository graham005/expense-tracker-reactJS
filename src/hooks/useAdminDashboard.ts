import { useCategories } from "@/hooks/useCategory"
import { useExpenses } from "@/hooks/useExpenses"
import { useUsers } from "@/hooks/useUsers"
import { useMemo } from "react"

export function useAdminDashboard() {
  const { data: userData = [] } = useUsers()
  const { data: categoryData = [] } = useCategories()
  const { data: expenseData = [] } = useExpenses()

  // Calculate summary data
  const totalUsers = userData.length
  const totalCategories = categoryData.length
  const totalExpenses = expenseData.length
  const totalAmount = expenseData.reduce((sum, e) => sum + e.amount, 0)
  const avgExpensePerUser = totalUsers ? (totalAmount / totalUsers).toFixed(2) : "0.00"

  // Recent transactions (last 4)
  const recentTransactions = [...expenseData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
    .map(expense => ({
      ...expense,
      user: userData.find(u => u.user_id === expense.user)?.username || "Unknown",
      category: categoryData.find(c => c.category_id === expense.category.category_id)?.category_name || "Unknown"
    }))

  // Expense categories breakdown
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {}
    expenseData.forEach(expense => {
      const category = categoryData.find(c => c.category_id === expense.category.category_id)?.category_name || "Other"
      map[category] = (map[category] || 0) + expense.amount
    })
    return map
  }, [expenseData, categoryData])

  const categoryCount: Record<string, number> = {};
    expenseData.forEach(exp => {
        const catName = exp.category?.category_name || "Unknown";
        categoryCount[catName] = (categoryCount[catName] || 0) + 1;
    });

    const userGrowthData = (() => {
            const { data: users = [] } = useUsers()
            const counts: Record<string, number> ={}
            users.forEach(u => {
                const date = new Date(u.created_at || Date.now())
                const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
                counts[key] = (counts[key] || 0) + 1
            })
    
            const sortedKeys = Object.keys(counts).sort()
            let cumulative = 0
            return sortedKeys.map(month => {
                cumulative += counts[month]
                return { month, users: cumulative}
            })
        })()

  return {
    totalUsers,
    totalCategories,
    totalExpenses,
    totalAmount,
    avgExpensePerUser,
    recentTransactions,
    categoryBreakdown,
    categoryCount,
    users: userData,
    userGrowthData,
  }
}