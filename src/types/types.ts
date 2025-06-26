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