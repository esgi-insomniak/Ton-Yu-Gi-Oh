import { BASE_URL } from "../utils/constants"
import { ZodSchema } from "zod"
import { ApiRequestOptions } from "../types/api"

export const apiRequest = async <Body extends object, Schema extends ZodSchema>(apiRequestOptions: ApiRequestOptions<Body>, schema: Schema) => {
    const { url, body, ...apiRequestRemainingOptions } = apiRequestOptions
    const searchURL = new URL(url, BASE_URL).toString()

    const fetchOptions = {
        ...apiRequestRemainingOptions,
        body: JSON.stringify(body)
    }

    const response = await fetch(searchURL, fetchOptions)
    const json = await response.json()

    return schema.parse(json)
}