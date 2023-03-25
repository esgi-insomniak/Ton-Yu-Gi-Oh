import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { UserType } from '../../../types/users'
import { apiRequest } from '../../index'

const QUERY_URLS = {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
} as const

const authKeys = {
    login: (username: string, password: string) => ['auth', 'login', username, password],
    logout: () => ['auth', 'logout'],
    register: () => ['auth', 'register'],
} as const

export const useLogin = () => {

    const queryClient = useQueryClient()

    const { data, error } = useMutation({
        mutationFn: ({ username, password }: { username: string, password: string }) => apiRequest({
            url: QUERY_URLS.login,
            method: 'POST',
            payload: { username, password },
        }),
        onSuccess: (data: Response) => {
            queryClient.setQueryData(authKeys.login("test", "tres"), Promise.resolve(data))
        }
    })

    const value = React.useMemo(() => {
        return { data, error }
    }, [data, error])

    return { value }

}

export const useLogout = () => {
    const queryClient = useQueryClient()
    const { data, error } = useMutation(() => apiRequest({
        url: QUERY_URLS.logout,
        method: 'POST',
    }), {
        onSuccess: () => {
            queryClient.invalidateQueries(authKeys.logout())
        }
    })

    const value = React.useMemo(() => {
        return { data, error }
    }, [data, error])

    return value
}

export const useRegister = (newUser: UserType) => {
    const queryClient = useQueryClient()
    const { data, error } = useMutation(() => apiRequest({
        url: QUERY_URLS.register,
        method: 'POST',
        payload: newUser,
    }), {
        onSuccess: (data) => {
            queryClient.setQueryData(authKeys.register(), data)
        }
    })

    const value = React.useMemo(() => {
        return { data, error }
    }, [data, error])

    return value
}

