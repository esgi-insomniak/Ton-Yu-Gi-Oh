import React from 'react'
import { useMutation } from 'react-query'
import { AuthRegisterType } from '@/helpers/types/users'
import { apiRequest, getToken } from '@/helpers/api'
import { responseConfirmAccountSchema, responseConfirmAccountSchemaType, responseLoginSchema, responseLoginSchemaType, responseRegisterSchema, responseRegisterSchemaType } from '@/helpers/utils/schema/Auth'
import { useMe } from '../users'

const QUERY_URLS = {
    login: '/login',
    register: '/users',
    confirmAccount: '/confirm_account',
    requestResetPasswordMail: '/send_reset_password_email',
    requestResetPassword: '/reset_password',
    logout: '/logout',
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

const requestLogout = () => apiRequest({
    url: QUERY_URLS.logout,
    method: 'POST',
    token: getToken(),
})

export const useLogin = () =>
    useMutation<responseLoginSchemaType, Error, { username: string, password: string }>
        ((credentials) => requestLogin(credentials.username, credentials.password), {
            onSuccess: (data) => { localStorage.setItem('token', data.token); broadcast(data.token) }
        })

export const useRegister = () =>
    useMutation<responseRegisterSchemaType, Error, AuthRegisterType>((newUser) => requestRegister(newUser))

export const useConfirmAccount = () =>
    useMutation<responseConfirmAccountSchemaType, Error, string>((confirmationToken) => confimAccount(confirmationToken))

export const useRequestResetPasswordMail = () =>
    useMutation<void, Error, string>((email) => requestResetPasswordMail(email))

export const useRequestResetPassword = () =>
    useMutation<void, Error, { password: string, token: string }>((credentials) => requestResetPassword(credentials.password, credentials.token))

export const useLogout = () => {
    const { refetch } = useMe()
    return useMutation<void, Error, void>(() => requestLogout(), {
        onSuccess: () => {
            localStorage.removeItem('token');
            broadcast(null);
            refetch();
        }
    })
}

const eventListeners: Function[] = [];

const broadcast = (token: string | null) => {
    eventListeners.forEach(listener => listener(token))
}

const onChangeAuth = (cb: Function) => {
    eventListeners.push(cb)
    return () => {
        eventListeners.slice(eventListeners.indexOf(cb), 1);
    }
}

export const useToken = () => {
    const [token, setToken] = React.useState(getToken())
    React.useEffect(() => {
        const listener = (token: string) => {
            setToken(token)
        }
        const sub = onChangeAuth(listener)
        return () => {
            sub();
        }
    }, []);

    return token;
}