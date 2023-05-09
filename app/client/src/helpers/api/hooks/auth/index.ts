import React from 'react'
import { useMutation } from 'react-query'
import { AuthRegisterType } from '@/helpers/types/users'
import { apiRequest } from '@/helpers/api'
import { responseConfirmAccountSchema, responseConfirmAccountSchemaType, responseLoginSchema, responseLoginSchemaType, responseRegisterSchema, responseRegisterSchemaType } from '@/helpers/utils/schema/Auth'

const QUERY_URLS = {
    login: '/login',
    register: '/users',
    confirmAccount: '/confirm_account',
    requestResetPasswordMail: '/send_reset_password_email',
    requestResetPassword: '/reset_password',
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

const confimAccount = (confirmationToken: string) => apiRequest({
    url: QUERY_URLS.confirmAccount,
    method: 'POST',
    body: { confirmationToken },
})

const requestResetPasswordMail = (email: string) => apiRequest({
    url: QUERY_URLS.requestResetPasswordMail,
    method: 'POST',
    body: { email },
})

const requestResetPassword = (password: string, renewToken: string) => apiRequest({
    url: QUERY_URLS.requestResetPassword,
    method: 'POST',
    body: { password, renewToken },
})

export const useLogin = () =>
    useMutation<responseLoginSchemaType, Error, { username: string, password: string }>
        ((credentials) => requestLogin(credentials.username, credentials.password))

export const useRegister = () =>
    useMutation<responseRegisterSchemaType, Error, AuthRegisterType>((newUser) => requestRegister(newUser))

export const useConfirmAccount = () =>
    useMutation<responseConfirmAccountSchemaType, Error, string>((confirmationToken) => confimAccount(confirmationToken))

export const useRequestResetPasswordMail = () =>
    useMutation<void, Error, string>((email) => requestResetPasswordMail(email))

export const useRequestResetPassword = () =>
    useMutation<void, Error, { password: string, token: string }>((credentials) => requestResetPassword(credentials.password, credentials.token))
