import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { UserType } from '../../../types/users'
import { apiRequest } from '../../index'
import { responseLoginSchema, responseLoginSchemaType } from '../../../utils/schema/Auth'

const QUERY_URLS = {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
} as const

const authKeys = {
    all: ['auth'],
    login: (username: string, password: string) => [...authKeys.all, username, password],
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