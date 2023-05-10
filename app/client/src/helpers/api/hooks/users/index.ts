import { apiRequest } from '@/helpers/api'
import { UserMe } from '@/helpers/types/users'
import { responseRegisterSchema } from '@/helpers/utils/schema/Auth'
import { useQuery } from 'react-query'

const QUERY_URLS = {
    me: (id: string) => `/users/${id}`
} as const

const token = localStorage.getItem('token')

const requestMe = (id: string) => apiRequest({
    url: QUERY_URLS.me(id),
    method: 'GET',
    token: !!token ? token : undefined
}, responseRegisterSchema)

export const useMe = (id: string) => {
    const { data, isLoading, error } = useQuery<UserMe>(['me', id], () => requestMe(id), {
        enabled: !!id,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        isLoading,
        error
    }
}