import type { TUser } from "@/types/types"
import { handleApiResponse, url } from "./handleApiResponse";


export interface TUpdateUser extends TUser{
    
}

export const getUsers = async (): Promise<TUser[]> => {
    const response = await fetch(`${url}/users`)
    await handleApiResponse(response);
    return response.json()
}

export const getUser = async (id: string): Promise<TUser> => {
    const response = await fetch(`${url}/users/${parseInt(id)}`)
    await handleApiResponse(response);
    return response.json()
}

export const createUser = async (userData: TUser): Promise<TUser> => {
    const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    await handleApiResponse(response);
    return response.json()
}

export const updateUser = async({user_id, ...userData}: TUpdateUser): Promise<TUser> => {
    const numericId = parseInt(user_id);
    if(isNaN(numericId)) {
        throw new Error(`Invalid userId: ${user_id}`)
    }

    const response = await fetch(`${url}/users/${numericId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    await handleApiResponse(response);
    return response.json()
    
}

export const deleteUser = async(user_id: string): Promise<void> => {
    const numericId = parseInt(user_id)
    if(isNaN(numericId)) {
        throw new Error(`Invalid user Id: ${user_id}`)
    }

    const response = await fetch(`${url}/users/${numericId}`, {
        method: 'DELETE',
    })
    await handleApiResponse(response);
}
