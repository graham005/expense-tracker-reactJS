import { getExpenses, getExpense, createExpense, type TUpdateExpense, updateExpense, deleteExpense } from "@/api/ExpenseApi";
import type { TExpense } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query"

export const useExpenses = (): UseQueryResult<TExpense[], Error> => {
    return useQuery ({
        queryKey: ['expenses'],
        queryFn: getExpenses,
    });
}

export const useExpense = (id: string): UseQueryResult<TExpense, Error> => {
    return useQuery ({
        queryKey: ['expenses', id],
        queryFn: () => getExpense(id),
        enabled: !!id,
    });
};

export const useCreateExpense = (): UseMutationResult<TExpense, Error, TExpense> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createExpense'],
        mutationFn: createExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'], exact: true});
        },
    });
};

export const useUpdateExpense =  (): UseMutationResult<TExpense, Error, TUpdateExpense> => {
    const queryClient = useQueryClient();

    return useMutation ({
        mutationKey: ['updateExpense'],
        mutationFn: updateExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['updateExpense'], exact: true})
        }
    })
}

export const useDeleteExpense = (): UseMutationResult<void, Error, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteExpense'],
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['deleteExpense'], exact: true})
        }
    })
}