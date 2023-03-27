import { z, ZodSchema } from "zod";

interface ApiRequestOptions<Body extends object> extends Omit<RequestInit, "body"> {
    url: string,
    body: Body
}

const apiRequest = async <Body extends object, Schema extends ZodSchema>(apiRequestOptions: ApiRequestOptions<Body>, schema: Schema) => {
    const { url, body, ...apiRequestRemainingOptions } = apiRequestOptions

    const fetchOptions = {
        ...apiRequestRemainingOptions,
        body: JSON.stringify(body)
    }

    const response = await fetch(url, fetchOptions)
    const json = await response.json()

    return schema.parse(json)
}

// CREATE USER

const createUserResponseSchema = z.object({
    success: z.boolean()
})

type CreateUserResponseSchema = typeof createUserResponseSchema

type CreateUserBody = {
    email: string
}

const createUserOptions = {
    method: "GET",
    url: "https://jsonplaceholder.tyipcode.com/users",
    body: {
        "email": "email@domain.com"
    }
}

const createUser = (body: CreateUserBody) => {
    const apiRequestOptions = {
        ...createUserOptions,
        body
    };

    return apiRequest<CreateUserBody, CreateUserResponseSchema>(apiRequestOptions, createUserResponseSchema);
};

// MAIN

const createAdministratorResult = await createUser({
    email: "administrator@domain.com"
});

const createUserResult = await createUser({
    // @ts-expect-error
    email: 123
});