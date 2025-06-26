import type { TCategory } from "@/types/types";
import { handleApiResponse, url } from "./handleApiResponse";

export interface TUpdateCategory extends TCategory{

}

export const getCategories = async (): Promise<TCategory[]> => {
    const response = await fetch(`${url}/categories`)
    await handleApiResponse(response);
    return response.json();
}

export const getCategory = async (id: string): Promise<TCategory> => {
    const response = await fetch(`${url}/categories/${parseInt(id)}`);
    await handleApiResponse(response);
    return response.json();
}

export const createCategory = async (categoryData: TCategory): Promise<TCategory> => {
    const response = await fetch(`${url}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData)
    });

    await handleApiResponse(response);
    return response.json();
}

export const updateCategory = async ({category_id, ...categoryData}: TUpdateCategory): Promise<TCategory> => {
    const numericId = parseInt(category_id)
    if(isNaN(numericId)) {
        throw new Error (`Invalid category ID: ${category_id}`)
    }
    const response = await fetch(`${url}/categories/${numericId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
    });

    await handleApiResponse(response);
    return response.json();
}

export const deleteCategory = async (id: string): Promise<void> => {
    const numericId = parseInt(id);
    if(isNaN(numericId)) {
        throw new Error(`Invalid category Id: ${id}`)
    }

    const response = await fetch(`${url}/categories/${numericId}`, {
        method: 'DELETE',
    });

    await handleApiResponse(response)
}