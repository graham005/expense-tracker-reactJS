import { createUser, deleteUser, getUser, getUsers, updateUser, type TUpdateUser } from "@/api/UserApi"
import type { TUser } from "@/types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query"

export const useUsers = (): UseQueryResult<TUser[], Error> => {
    return useQuery ({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

export const useUser = (id: string): UseQueryResult<TUser, Error> => {
    return useQuery ({
        queryKey: ['users', id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};

export const useCreateUser = (): UseMutationResult<TUser, Error, TUser> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'], exact: true});
        },
    });
};

export const useUpdateUser =  (): UseMutationResult<TUser, Error, TUpdateUser> => {
    const queryClient = useQueryClient();

    return useMutation ({
        mutationKey: ['updateUser'],
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['updateUser'], exact: true})
        }
    })
}

export const useDeleteUser = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteUser'],
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['deleteUser'], exact: true})
        }
    })
}