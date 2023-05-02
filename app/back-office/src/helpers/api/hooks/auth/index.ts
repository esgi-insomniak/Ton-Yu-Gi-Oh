import React from 'react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { UserType } from '@/helpers/types/users'
import { apiRequest } from '@/helpers/api'
import { responseLoginSchema, responseLoginSchemaType } from '@/helpers/utils/schema/Auth'

const QUERY_URLS = {
    login: '/login',
    logout: '/users/logout',
    register: '/users',
} as const

const authKeys = {
    all: ['auth'],
    logout: () => [...authKeys.all, 'logout'],
    register: () => [...authKeys.all, 'register'],
} as const

const requestLogin = (username: string, password: string) => apiRequest({
    url: QUERY_URLS.login,
    method: 'POST',
    body: { username, password },
}, responseLoginSchema)


export const useLogin = () =>
    useMutation<responseLoginSchemaType, Error, { username: string, password: string }>
        ((credentials) => requestLogin(credentials.username, credentials.password))

export const useLogout = () => {
    const queryClient = useQueryClient()
}

export const useRegister = (newUser: UserType) => {
    const queryClient = useQueryClient()
}