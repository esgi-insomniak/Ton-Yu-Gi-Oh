import { BASE_URL } from "@/helpers/utils/constants"
import { ZodSchema } from "zod"
import { ApiRequestOptions } from "@/helpers/types/api"

export const apiRequest = async <Body extends object, Schema extends ZodSchema>(apiRequestOptions: ApiRequestOptions<Body>, schema: Schema) => {
    const { url, body, token, ...apiRequestRemainingOptions } = apiRequestOptions

    const fetchOptions = {
        ...apiRequestRemainingOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        },
        ...(body && { body: JSON.stringify(body) })
    }

    const response = await fetch(`${BASE_URL}${url}`, fetchOptions)
    const json = await response.json()

    return schema.parse(json)
}