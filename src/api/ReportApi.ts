import { handleApiResponse, url } from "./handleApiResponse";

export const getCategoriesUsage = async () => {
    const response = await fetch(`${url}/reports/usage`)
    await handleApiResponse(response);
    return response.json()
}

export const getCategoryReport = async (id: string) => {
    const response = await fetch(`${url}/reports/category/${parseInt(id)}`)
    await handleApiResponse(response);
    return response.json()
}

export const getDailySummaryReport = async (date: string) => {
    const response = await fetch(`${url}/reports/daily-summary/${date}`)
    await handleApiResponse(response);
    return response.json()
}

export const getDailyReport = async (date: string) => {
    const response = await fetch(`${url}/reports/daily/${date}`)
    await handleApiResponse(response);
    return response.json()
}

export const getMonthlySummaryReport = async (month: string, year: string) => {
    const response = await fetch(`${url}/reports/monthly-summary/${year}/${month}`)
    await handleApiResponse(response);
    return response.json()
}

export const getMonthlyReport = async (month: string, year: string) => {
    const response = await fetch(`${url}/reports/monthly/${year}/${month}`)
    await handleApiResponse(response);
    return response.json()
}

export const getYearlySummaryReport = async (year: string) => {
    const response = await fetch(`${url}/reports/yearly-summary/${year}`)
    await handleApiResponse(response);
    return response.json()
}

export const getYearlyReport = async (year: string) => {
    const response = await fetch(`${url}/reports/yearly/${year}`)
    await handleApiResponse(response);
    return response.json()
}
