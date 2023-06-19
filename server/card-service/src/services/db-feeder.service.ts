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
import { rarityDropTable, mappedRarities } from 'src/config/raritiesDropTable';
import { RarityDropTable } from 'src/entities/rarityDropTable.entity';

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
    - RarityDropTable: ${await this.feedRarityDropTable({ chunk })}
    - Rarities: ${await this.feedRarities({ rowData, chunk })}
    - Sets: ${await this.feedSets({ rowData, chunk })}
    - LinkMarkers: ${await this.feedLinkMarkers({ rowData, chunk })}
    - Cards: ${await this.feedCards({ rowData, chunk })}
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

    return (
      await this.dataSource
        .getRepository(Attribute)
        .save(newAttributes, { chunk })
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

    return (
      await this.dataSource
        .getRepository(Archetype)
        .save(newArchetypes, { chunk })
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

    return (await this.dataSource.getRepository(Type).save(newTypes, { chunk }))
      .length;
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

    return (
      await this.dataSource
        .getRepository(FrameType)
        .save(newFrameTypes, { chunk })
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

    return (await this.dataSource.getRepository(Race).save(newRaces, { chunk }))
      .length;
  }

  async feedRarityDropTable({ chunk = 1000 }): Promise<number> {
    return (
      await this.dataSource
        .getRepository(RarityDropTable)
        .save(rarityDropTable, { chunk })
    ).length;
  }

  async feedRarities({ rowData, chunk = 1000 }): Promise<number> {
    const rtTable = await this.dataSource.getRepository(RarityDropTable).find();

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
                    dropTable: rtTable.find(
                      (table) =>
                        table.rarityType ===
                        Object.keys(mappedRarities).find((key) =>
                          mappedRarities[key].includes(set.set_rarity),
                        ),
                    ),
                  }),
                );
              } else if (set.set_rarity_code.match(/(\w*)/g)[1] !== undefined) {
                rarities.push(
                  this.dataSource.getRepository(Rarity).create({
                    name: set.set_rarity,
                    code: set.set_rarity_code.match(/(\w*)/g)[1],
                    dropTable: rtTable.find(
                      (table) =>
                        table.rarityType ===
                        Object.keys(mappedRarities).find((key) =>
                          mappedRarities[key].includes(set.set_rarity),
                        ),
                    ),
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

    return (
      await this.dataSource.getRepository(Rarity).save(newRarities, { chunk })
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
                  cardSetsOnOpen:
                    cardSet.set_code.match(/(\w*)/g)[0] === 'BLAR' ? 5 : 9,
                }),
              );
            }
          });
        }
        return sets;
      },
      [],
    );

    return (await this.dataSource.getRepository(Set).save(newSets, { chunk }))
      .length;
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

    return (
      await this.dataSource
        .getRepository(LinkMarker)
        .save(newLinkMarkers, { chunk })
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
      const newPrice: DeepPartial<Price> = {
        cardMarketPrice: card.card_prices[0].cardmarket_price,
        tcgPlayerPrice: card.card_prices[0].tcgplayer_price,
        ebayPrice: card.card_prices[0].ebay_price,
        amazonPrice: card.card_prices[0].amazon_price,
        coolStuffIncPrice: card.card_prices[0].coolstuffinc_price,
      };

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
        price: newPrice,
      } as DeepPartial<Card>;
    });

    return (await this.dataSource.getRepository(Card).save(newCards, { chunk }))
      .length;
  }

  async feedCardSets({ rowData, chunk = 1000 }): Promise<number> {
    const cards = await this.dataSource.getRepository(Card).find();
    const sets = await this.dataSource.getRepository(Set).find();
    const rarities = await this.dataSource.getRepository(Rarity).find();

    let newCardSets: DeepPartial<CardSet>[] = await rowData.reduce(
      (cardSets: CardSet[], card: any) => {
        if (card.card_sets && card.card_sets.length > 0) {
          card.card_sets.forEach((cardSet: any) => {
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

    return (
      await this.dataSource.getRepository(CardSet).save(newCardSets, { chunk })
    ).length;
  }
}
