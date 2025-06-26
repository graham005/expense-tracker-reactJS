import type { TExpense } from "@/types/types"
import { handleApiResponse, url } from "./handleApiResponse";


export interface TUpdateExpense extends TExpense{
    
}

export const getExpenses = async (): Promise<TExpense[]> => {
    const response = await fetch(`${url}/expenses`)
    await handleApiResponse(response);
    return response.json()
}

export const getExpense = async (id: string): Promise<TExpense> => {
    const response = await fetch(`${url}/expenses/${parseInt(id)}`)
    await handleApiResponse(response);
    return response.json()
}

export const createExpense = async (expenseData: TExpense): Promise<TExpense> => {
    const response = await fetch(`${url}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData)
    })
    await handleApiResponse(response);
    return response.json()
}

export const updateExpense = async({expense_id, ...expenseData}: TUpdateExpense): Promise<TExpense> => {
    const numericId = parseInt(expense_id);
    if(isNaN(numericId)) {
        throw new Error(`Invalid expense Id: ${expense_id}`)
    }

    const response = await fetch(`${url}/expenses/${numericId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData)
    });
    await handleApiResponse(response);
    return response.json()
    
}

export const deleteExpense = async(expense_id: string): Promise<void> => {
    const numericId = parseInt(expense_id)
    if(isNaN(numericId)) {
        throw new Error(`Invalid expense Id: ${expense_id}`)
    }

    const response = await fetch(`${url}/expenses/${numericId}`, {
        method: 'DELETE',
    })
    await handleApiResponse(response);
}
