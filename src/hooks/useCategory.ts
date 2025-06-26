import { createCategory, deleteCategory, getCategories, getCategory, updateCategory, type TUpdateCategory } from "@/api/CategoryApi"
import type { TCategory } from "@/types/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query"

export const useCategories = (): UseQueryResult<TCategory[], Error> => {
    return useQuery ({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
}

export const useCategory = (id: string): UseQueryResult<TCategory, Error> => {
    return useQuery ({
        queryKey: ['category', id],
        queryFn: () => getCategory(id),
        enabled: !!id,
    });
};

export const useCreateCategory = (): UseMutationResult<TCategory, Error, TCategory> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createCategory'],
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'], exact: true});
        },
    });
};

export const useUpdateCategory =  (): UseMutationResult<TCategory, Error, TUpdateCategory> => {
    const queryClient = useQueryClient();

    return useMutation ({
        mutationKey: ['updateCategory'],
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['updateCategory'], exact: true})
        }
    })
}

export const useDeleteCategory = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['deleteUser'], exact: true})
        }
    })
}