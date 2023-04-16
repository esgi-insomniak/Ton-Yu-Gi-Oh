import { Injectable } from '@nestjs/common';
import { Card } from 'src/entities/card.entity';
import { DataSource, DeepPartial } from 'typeorm';
import { ConfigService } from './config/config.service';
import { Archetype } from 'src/entities/archetype.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { Type } from 'src/entities/type.entity';
import { CardSet } from 'src/entities/cardSet.entity';
import { FrameType } from 'src/entities/frameType.entity';
import { LinkMarker } from 'src/entities/linkMarker.entity';
import { Price } from 'src/entities/price.entity';
import { Race } from 'src/entities/race.entity';
import { Rarity } from 'src/entities/rarity.entity';
import { Set } from 'src/entities/set.entity';

@Injectable()
export class DBFeederService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async feedDatabase(chunk = 1000): Promise<string> {
    const rowData = (await this.getRowApiData()).data;
    return `
    Values inserted:

    - Attributes: ${await this.feedAttributes({ rowData, chunk })}
    - Archetypes: ${await this.feedArchetypes({ rowData, chunk })}
    - Types: ${await this.feedTypes({ rowData, chunk })}
    - FrameTypes: ${await this.feedFrameTypes({ rowData, chunk })}
    - Races: ${await this.feedRaces({ rowData, chunk })}
    - Rarities: ${await this.feedRarities({ rowData, chunk })}
    - Sets: ${await this.feedSets({ rowData, chunk })}
    - LinkMarkers: ${await this.feedLinkMarkers({ rowData, chunk })}
    - Cards: ${await this.feedCards({ rowData, chunk })}
    - Prices: ${await this.feedPrices({ rowData, chunk })}
    - CardSets: ${await this.feedCardSets({ rowData, chunk })}
    `;
  }

  async getRowApiData(): Promise<any> {
    return await (
      await fetch(
        `${this.configService.get(
          'yugiohApi',
        )}/cardinfo.php?language=${this.configService.get('yugiohLanguage')}`,
      )
    ).json();
  }

  async feedAttributes({ rowData, chunk = 1000 }): Promise<number> {
    const newAttributes: DeepPartial<Attribute>[] = rowData.reduce(
      (attributes: Attribute[], card: any) => {
        if (
          card.attribute &&
          !attributes.find((attribute) => attribute.name === card.attribute)
        ) {
          attributes.push(
            this.dataSource.getRepository(Attribute).create({
              name: card.attribute,
            }),
          );
        }
        return attributes;
      },
      [],
    );
    const currentAttributes = await this.dataSource
      .getRepository(Attribute)
      .find({
        where: newAttributes.map((attribute) => ({
          name: attribute.name,
        })),
      });
    return (
      await this.dataSource.getRepository(Attribute).save(
        newAttributes.filter(
          (attribute) =>
            !currentAttributes.find(
              (currentAttribute) => currentAttribute.name === attribute.name,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedArchetypes({ rowData, chunk = 1000 }): Promise<number> {
    const newArchetypes: DeepPartial<Archetype>[] = rowData.reduce(
      (archetypes: Archetype[], card: any) => {
        if (
          card.archetype &&
          !archetypes.find((archetype) => archetype.name === card.archetype)
        ) {
          archetypes.push(
            this.dataSource.getRepository(Archetype).create({
              name: card.archetype,
            }),
          );
        }
        return archetypes;
      },
      [],
    );
    const currentArchetypes = await this.dataSource
      .getRepository(Archetype)
      .find({
        where: newArchetypes.map((archetype) => ({
          name: archetype.name,
        })),
      });
    return (
      await this.dataSource.getRepository(Archetype).save(
        newArchetypes.filter(
          (archetype) =>
            !currentArchetypes.find(
              (currentArchetype) => currentArchetype.name === archetype.name,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedTypes({ rowData, chunk = 1000 }): Promise<number> {
    const newTypes: DeepPartial<Type>[] = rowData.reduce(
      (types: Type[], card: any) => {
        if (card.type && !types.find((type) => type.name === card.type)) {
          types.push(
            this.dataSource.getRepository(Type).create({
              name: card.type,
            }),
          );
        }
        return types;
      },
      [],
    );
    const currentTypes = await this.dataSource.getRepository(Type).find({
      where: newTypes.map((type) => ({
        name: type.name,
      })),
    });
    return (
      await this.dataSource.getRepository(Type).save(
        newTypes.filter(
          (type) =>
            !currentTypes.find((currentType) => currentType.name === type.name),
        ),
        { chunk },
      )
    ).length;
  }

  async feedFrameTypes({ rowData, chunk = 1000 }): Promise<number> {
    const newFrameTypes: DeepPartial<FrameType>[] = rowData.reduce(
      (frameTypes: FrameType[], card: any) => {
        if (
          card.frameType &&
          !frameTypes.find((frameType) => frameType.name === card.frameType)
        ) {
          frameTypes.push(
            this.dataSource.getRepository(FrameType).create({
              name: card.frameType,
            }),
          );
        }
        return frameTypes;
      },
      [],
    );
    const currentFrameTypes = await this.dataSource
      .getRepository(FrameType)
      .find({
        where: newFrameTypes.map((frameType) => ({
          name: frameType.name,
        })),
      });
    return (
      await this.dataSource.getRepository(FrameType).save(
        newFrameTypes.filter(
          (frameType) =>
            !currentFrameTypes.find(
              (currentFrameType) => currentFrameType.name === frameType.name,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedRaces({ rowData, chunk = 1000 }): Promise<number> {
    const newRaces: DeepPartial<Race>[] = rowData.reduce(
      (races: Race[], card: any) => {
        if (card.race && !races.find((race) => race.name === card.race)) {
          races.push(
            this.dataSource.getRepository(Race).create({
              name: card.race,
            }),
          );
        }
        return races;
      },
      [],
    );
    const currentRaces = await this.dataSource.getRepository(Race).find({
      where: newRaces.map((race) => ({
        name: race.name,
      })),
    });
    return (
      await this.dataSource.getRepository(Race).save(
        newRaces.filter(
          (race) =>
            !currentRaces.find((currentRace) => currentRace.name === race.name),
        ),
        { chunk },
      )
    ).length;
  }

  async feedRarities({ rowData, chunk = 1000 }): Promise<number> {
    const newRarities: DeepPartial<Rarity>[] = rowData.reduce(
      (rarities: Rarity[], card: any) => {
        if (card.card_sets && card.card_sets.length > 0) {
          card.card_sets.forEach((set: any) => {
            if (
              !rarities.find(
                (rarity) =>
                  rarity.code === set.set_rarity_code.match(/(\w*)/g)[1],
              )
            ) {
              if (
                set.set_rarity_code.match(/(\w*)/g)[1] === undefined &&
                !rarities.find((rarity) => rarity.name === set.set_rarity)
              ) {
                rarities.push(
                  this.dataSource.getRepository(Rarity).create({
                    name: set.set_rarity,
                    code: set.set_rarity,
                  }),
                );
              } else if (set.set_rarity_code.match(/(\w*)/g)[1] !== undefined) {
                rarities.push(
                  this.dataSource.getRepository(Rarity).create({
                    name: set.set_rarity,
                    code: set.set_rarity_code.match(/(\w*)/g)[1],
                  }),
                );
              }
            }
          });
        }

        return rarities;
      },
      [],
    );
    const currentRarities = await this.dataSource.getRepository(Rarity).find({
      where: newRarities.map((rarity) => ({
        code: rarity.code,
      })),
    });
    return (
      await this.dataSource.getRepository(Rarity).save(
        newRarities.filter(
          (rarity) =>
            !currentRarities.find(
              (currentRarity) => currentRarity.code === rarity.code,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedSets({ rowData, chunk = 1000 }): Promise<number> {
    const newSets: DeepPartial<Set>[] = rowData.reduce(
      (sets: Set[], card: any) => {
        if (card.card_sets && card.card_sets.length > 0) {
          card.card_sets.forEach((cardSet: any) => {
            if (!sets.find((set) => set.name === cardSet.set_name)) {
              sets.push(
                this.dataSource.getRepository(Set).create({
                  name: cardSet.set_name,
                  code: cardSet.set_code.match(/(\w*)/g)[0],
                  image: `https://images.ygoprodeck.com/images/sets/${
                    cardSet.set_code.match(/(\w*)/)[0]
                  }.jpg`,
                }),
              );
            }
          });
        }
        return sets;
      },
      [],
    );
    const currentSets = await this.dataSource.getRepository(Set).find({
      where: newSets.map((set) => ({
        code: set.code,
      })),
    });
    return (
      await this.dataSource.getRepository(Set).save(
        newSets.filter(
          (set) =>
            !currentSets.find((currentSet) => currentSet.code === set.code),
        ),
        { chunk },
      )
    ).length;
  }

  async feedLinkMarkers({ rowData, chunk = 1000 }): Promise<number> {
    const newLinkMarkers: DeepPartial<LinkMarker>[] = rowData.reduce(
      (linkMarkers: LinkMarker[], card: any) => {
        if (card.linkmarkers && card.linkmarkers.length > 0) {
          card.linkmarkers.forEach((cardLinkMarker: string) => {
            if (
              !linkMarkers.find(
                (linkMarker) => linkMarker.name === cardLinkMarker,
              )
            ) {
              linkMarkers.push(
                this.dataSource.getRepository(LinkMarker).create({
                  name: cardLinkMarker,
                }),
              );
            }
          });
        }
        return linkMarkers;
      },
      [],
    );
    const currentLinkMarkers = await this.dataSource
      .getRepository(LinkMarker)
      .find({
        where: newLinkMarkers.map((linkMarker) => ({
          name: linkMarker.name,
        })),
      });
    return (
      await this.dataSource.getRepository(LinkMarker).save(
        newLinkMarkers.filter(
          (linkMarker) =>
            !currentLinkMarkers.find(
              (currentLinkMarker) => currentLinkMarker.name === linkMarker.name,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedCards({ rowData, chunk = 1000 }): Promise<number> {
    const types = await this.dataSource.getRepository(Type).find();
    const frameTypes = await this.dataSource.getRepository(FrameType).find();
    const races = await this.dataSource.getRepository(Race).find();
    const archetypes = await this.dataSource.getRepository(Archetype).find();
    const attributes = await this.dataSource.getRepository(Attribute).find();
    const linkMarkers = await this.dataSource.getRepository(LinkMarker).find();

    const newCards: DeepPartial<Card>[] = await rowData.map((card: any) => {
      return {
        identifiant: card.id,
        name: card.name,
        enName: card.name_en,
        description: card.desc,
        atk: card.atk,
        def: card.def,
        level: card.level,
        scale: card.scale,
        linkVal: card.linkval,
        imageUrl: card.card_images[0].image_url,
        imageUrlSmall: card.card_images[0].image_url_small,
        type: types.find((type) => type.name === card.type),
        frameType: frameTypes.find(
          (frameType) => frameType.name === card.frameType,
        ),
        race: races.find((race) => race.name === card.race),
        archetype: archetypes.find(
          (archetype) => archetype.name === card.archetype,
        ),
        attribute: attributes.find(
          (attribute) => attribute.name === card.attribute,
        ),
        linkMarkers: card.linkmarkers
          ? linkMarkers.filter((linkMarker) =>
              card.linkmarkers.includes(linkMarker.name),
            )
          : [],
      } as DeepPartial<Card>;
    });
    const currentCards = await this.dataSource.getRepository(Card).find({
      where: newCards.map((card) => ({
        identifiant: card.identifiant,
      })),
    });
    return (
      await this.dataSource.getRepository(Card).save(
        newCards.filter(
          (card) =>
            !currentCards.find(
              (currentCard) => currentCard.identifiant === card.identifiant,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedPrices({ rowData, chunk = 1000 }): Promise<number> {
    const cards = await this.dataSource.getRepository(Card).find();
    const newPrices: DeepPartial<Price>[] = await rowData.map((card: any) => {
      return {
        card: cards.find((c) => c.identifiant === card.id).id,
        cardMarketPrice: card.card_prices[0].cardmarket_price,
        tcgPlayerPrice: card.card_prices[0].tcgplayer_price,
        ebayPrice: card.card_prices[0].ebay_price,
        amazonPrice: card.card_prices[0].amazon_price,
        coolStuffIncPrice: card.card_prices[0].coolstuffinc_price,
      } as DeepPartial<Price>;
    });
    const currentPrices = await this.dataSource.getRepository(Price).find({
      where: newPrices.map((price) => ({
        card: price.card,
      })),
    });
    return (
      await this.dataSource.getRepository(Price).save(
        newPrices.filter(
          (price) =>
            !currentPrices.find(
              (currentPrice) => currentPrice.card === price.card,
            ),
        ),
        { chunk },
      )
    ).length;
  }

  async feedCardSets({ rowData, chunk = 1000 }): Promise<number> {
    const cards = await this.dataSource.getRepository(Card).find();
    const sets = await this.dataSource.getRepository(Set).find();
    const rarities = await this.dataSource.getRepository(Rarity).find();

    let newCardSets: DeepPartial<CardSet>[] = await rowData.reduce(
      (cardSets: CardSet[], card: any) => {
        if (card.card_sets && card.card_sets.length > 0) {
          card.card_sets.forEach((cardSet: any) => {
            if (
              rarities.find((r) => r.name === cardSet.set_rarity) === undefined
            ) {
              console.log(cardSet.set_rarity);
            }
            cardSets.push(
              this.dataSource.getRepository(CardSet).create({
                card: cards.find((c) => c.identifiant === card.id).id,
                set: sets.find((s) => s.name === cardSet.set_name).id,
                rarity: rarities.find((r) => r.name === cardSet.set_rarity).id,
                price: cardSet.set_price,
              } as DeepPartial<CardSet>),
            );
          });
        }
        return cardSets;
      },
      [],
    );
    newCardSets = newCardSets.filter(
      (cardSet, index, self) =>
        index ===
        self.findIndex((t) => t.card === cardSet.card && t.set === cardSet.set),
    );

    const currentCardSets = await this.dataSource.getRepository(CardSet).find({
      where: newCardSets.map((cardSet) => ({
        card: cardSet.card,
        set: cardSet.set,
      })),
    });

    return (
      await this.dataSource.getRepository(CardSet).save(
        newCardSets.filter(
          (cardSet) =>
            !currentCardSets.find(
              (currentCardSet) =>
                currentCardSet.card === cardSet.card &&
                currentCardSet.set === cardSet.set,
            ),
        ),
        { chunk },
      )
    ).length;
  }
}
