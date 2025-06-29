import { getCategoriesUsage, getCategoryReport, getDailyReport, getDailySummaryReport, getMonthlyReport, getMonthlySummaryReport, getYearlyReport, getYearlySummaryReport } from "@/api/ReportApi";
import type { TCategoryReport, TCategoryUsageReport, TDailyReport, TDailySummaryReport, TMonthlyReport, TMonthlySummaryReport, TYearlyReport, TYearlySummaryReport } from "@/types/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useCategoryUsageReport = (): UseQueryResult<TCategoryUsageReport, Error> => {
    return useQuery({
        queryKey: ['report'],
        queryFn: getCategoriesUsage,
    });
}

export const useCategoryReport = (id: string): UseQueryResult<TCategoryReport, Error> => {
    return useQuery({
        queryKey: ['report', id],
        queryFn: () => getCategoryReport(id),
        enabled: !!id,
    });
};

export const useDailySummaryReport = (date: string): UseQueryResult<TDailySummaryReport, Error> => {
    return useQuery({
        queryKey: ['report', date],
        queryFn: () => getDailySummaryReport(date),
    });
};

export const useDailyReport = (date: string): UseQueryResult<TDailyReport, Error> => {
    return useQuery({
        queryKey: ['report', date],
        queryFn: () => getDailyReport(date),
    });
};

export const useMonthlySummaryReport = (month: string, year: string): UseQueryResult<TMonthlySummaryReport, Error> => {
    return useQuery({
        queryKey: ['report', month, year],
        queryFn: () => getMonthlySummaryReport(month, year),
    });
};

export const useMonthlyReport = (month: string, year: string): UseQueryResult<TMonthlyReport, Error> => {
    return useQuery({
        queryKey: ['report', month, year],
        queryFn: () => getMonthlyReport(month, year),
    });
};

export const useYearlySummaryReport = (year: string): UseQueryResult<TYearlySummaryReport, Error> => {
    return useQuery({
        queryKey: ['report', year],
        queryFn: () => getYearlySummaryReport(year),
    });
};

export const useYearlyReport = (year: string): UseQueryResult<TYearlyReport, Error> => {
    return useQuery({
        queryKey: ['report', year],
        queryFn: () => getYearlyReport(year),
    });
};