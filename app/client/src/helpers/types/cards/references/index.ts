type ApiCardAttType = {
    id: string;
    name: string;
}

type ApiCardFrameType = {
    id: string;
    name: string;
}

type ApiCardRace = {
    id: string;
    name: string;
}

type ApiCardAchetype = {
    id: string;
    name: string;
}

type ApiCardPrice = {
    id: string;
    cardMarketPrice: number;
    tcgPlayerPrice: number;
    ebayPrice: number;
    amazonPrice: number;
    coolStuffIncPrice: number;
}

export type { ApiCardAttType, ApiCardFrameType, ApiCardRace, ApiCardAchetype, ApiCardPrice }