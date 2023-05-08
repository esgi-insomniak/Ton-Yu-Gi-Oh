import * as zod from 'zod';

const commonSchema = zod.object({
    id: zod.string(),
    name: zod.string(),
});

export const priceSchema = zod.object({
    id: zod.string(),
    cardMarketPrice: zod.number(),
    tcgPlayerPrice: zod.number(),
    ebayPrice: zod.number(),
    amazonPrice: zod.number(),
    coolStuffIncPrice: zod.number(),
});

export const responseCardsSchema = zod.object({
    data: zod.array(zod.object({
        id: zod.string(),
        card: zod.object({
            id: zod.string(),
            identifiant: zod.number(),
            name: zod.string(),
            enName: zod.string(),
            description: zod.string(),
            atk: zod.number().nullable(),
            def: zod.number().nullable(),
            level: zod.number().nullable(),
            scale: zod.number().nullable(),
            linkVal: zod.number().nullable(),
            imageUrl: zod.string(),
            imageUrlSmall: zod.string(),
        }),
        set: zod.object({
            id: zod.string(),
            name: zod.string(),
            code: zod.string(),
            image: zod.string(),
        }),
        price: zod.number(),
        rarity: zod.object({
            id: zod.string(),
            name: zod.string(),
            code: zod.string(),
        }),
    }),
    ),
});
