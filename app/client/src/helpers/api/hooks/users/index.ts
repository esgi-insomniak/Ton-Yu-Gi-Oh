import { apiRequest } from '@/helpers/api'
import { UserMe } from '@/helpers/types/users'
import { responseRegisterSchema } from '@/helpers/utils/schema/Auth'
import { useQuery } from 'react-query'

const QUERY_URLS = {
    me: (id: string) => `/users/${id}`
} as const

const userKeys = {
    all: ['me'],
    me: (id: string, token: string) => [...userKeys.all, id, token]
} as const

const token = localStorage.getItem('token') || ''

const requestMe = (id: string) => apiRequest({
    url: QUERY_URLS.me(id),
    method: 'GET',
    token: !!token ? token : undefined
}, responseRegisterSchema)

export const useMe = (id: string) => {
    const { data, isLoading, error } = useQuery<UserMe>(userKeys.me(id, token), () => requestMe(id), {
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        error
    }
}