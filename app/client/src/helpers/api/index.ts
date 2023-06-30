import { BASE_URL } from "@/helpers/utils/constants"
import { ZodSchema } from "zod"
import { ApiRequestOptions } from "@/helpers/types/api"

export const apiRequest = async <Body extends object, Schema extends ZodSchema>(apiRequestOptions: ApiRequestOptions<Body>, schema?: Schema) => {
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

    let json = null

    try {
        json = await response.json()
    } catch { }

    if (!response.ok && json !== null) throw new Error(JSON.stringify(json))
    if (!response.ok && json === null) throw new Error()

    return schema ? schema.parse(json) : json
}

export const getToken = () => {
    return localStorage.getItem("token") || "";
};