import React from 'react'
import { useMutation } from 'react-query'
import { AuthRegisterType } from '@/helpers/types/users'
import { apiRequest } from '@/helpers/api'
import { responseLoginSchema, responseLoginSchemaType, responseRegisterSchema, responseRegisterSchemaType } from '@/helpers/utils/schema/Auth'

const QUERY_URLS = {
    login: '/login',
    register: '/users',
} as const

const authKeys = {
    all: ['auth'],
    register: () => [...authKeys.all, 'register'],
} as const

const requestLogin = (username: string, password: string) => apiRequest({
    url: QUERY_URLS.login,
    method: 'POST',
    body: { username, password },
}, responseLoginSchema)

const requestRegister = (newUser: AuthRegisterType) => apiRequest({
    url: QUERY_URLS.register,
    method: 'POST',
    body: newUser,
}, responseRegisterSchema)

export const useLogin = () =>
    useMutation<responseLoginSchemaType, Error, { username: string, password: string }>
        ((credentials) => requestLogin(credentials.username, credentials.password))

export const useRegister = () =>
    useMutation<responseRegisterSchemaType, Error, AuthRegisterType>((newUser) => requestRegister(newUser))
