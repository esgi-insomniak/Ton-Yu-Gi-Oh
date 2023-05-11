import { apiRequest } from '@/helpers/api'
import { responseSendPayementIcToStripeSchema, sendPayementIcToStripeSchema } from '@/helpers/utils/schema/shop'
import { useMutation } from 'react-query'

const QUERY_URLS = {
    payment: '/payment_checkout'
} as const

const token = localStorage.getItem('token')

const requestPayment = (productId: string) => apiRequest({
    url: QUERY_URLS.payment,
    method: 'POST',
    body: { productId },
    token: !!token ? token : undefined
}, sendPayementIcToStripeSchema)

const usePayment = () =>
    useMutation<typeof responseSendPayementIcToStripeSchema, Error, string>((productId) => requestPayment(productId), {
        onSuccess: (data) => {
            console.log('hook success', data)
        },
        onError: (error) => {
            console.log('hook err', error)
        }
    })

export { usePayment }