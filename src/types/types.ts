export interface TUser {
    user_id: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    created_at: string;
}

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface TExpense {
    expense_id: string;
    category: TCategory;
    amount: number;
    date: string;
    description: string;
    user: string;
}

export interface TCategory {
    category_id: string;
    category_name: string;
}

export interface TCategoryUsageReport {
    category_id: string;
    category_name: string;
    usage_count: string;
}

export interface TCategoryReport {
    expense: TExpense
}

export interface TDailySummaryReport {
    date: string;
    totalAmount: number;
    totalCount: number;
}

export interface TDailyReport {
    expense: TExpense
}

export interface TMonthlySummaryReport {
    year: number,
    month: number,
    totalAmount: number,
    totalCount: number,
    averageAmount: number
}

export interface TMonthlyReport {
    expense: TExpense
}

export interface TYearlySummaryReport {
    year: number,
    totalAmount: number,
    totalCount: number,
    averageAmount: number
}

export interface TYearlyReport {
    expense: TExpense
}