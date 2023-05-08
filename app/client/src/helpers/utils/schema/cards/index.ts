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
    data: zod.object({
        id: zod.string(),
        identifiant: zod.number(),
        name: zod.string(),
        enName: zod.string(),
        description: zod.string(),
        atk: zod.number(),
        def: zod.number(),
        level: zod.number(),
        scale: zod.number(),
        linkVal: zod.number(),
        imageUrl: zod.string(),
        imageUrlSmall: zod.string(),
        type: commonSchema,
        frameType: commonSchema,
        race: commonSchema,
        archetype: commonSchema,
        attribute: zod.string().nullable(),
        price: priceSchema,
        cardSets: zod.array(zod.object({
            id: zod.string(),
            price: zod.number(),
        })),
        linkMarkers: zod.array(zod.object({
            id: zod.string(),
            name: zod.string(),
        })),
    }),
});
