import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1681508556348 implements MigrationInterface {
  name = 'migration1681508556348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_91bf32b323734a2ffa3616a5c33" UNIQUE ("name"), CONSTRAINT "UQ_78eff9a9fd1c65089b246d372eb" UNIQUE ("code"), CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card" uuid NOT NULL, "set" uuid NOT NULL, "price" double precision NOT NULL, "cardId" uuid, "setId" uuid, "rarityId" uuid, CONSTRAINT "PK_8a16655353de96bb442a27aa50d" PRIMARY KEY ("id", "card", "set"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2a65857537fd8e462049724d69" ON "card_set" ("card", "set") `,
    );
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_350fb4f7eb87e4c7d35c97a9828" UNIQUE ("name"), CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frame_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_a289c5b55e409c21ceddea19525" UNIQUE ("name"), CONSTRAINT "PK_a167e239d0ff4a0abdd7df9fd79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "link_marker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_75d755ec7502d9207c78ad65de6" UNIQUE ("name"), CONSTRAINT "PK_2a7ed84dd6c35f4bdbaf9d3964a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "card" uuid NOT NULL, "cardMarketPrice" double precision NOT NULL, "tcgPlayerPrice" double precision NOT NULL, "ebayPrice" double precision NOT NULL, "amazonPrice" double precision NOT NULL, "coolStuffIncPrice" double precision NOT NULL, "cardId" uuid, CONSTRAINT "REL_5d21e3b7b80eee10fa0bd7ac91" UNIQUE ("cardId"), CONSTRAINT "PK_b8288d2373b2e06555bfeca6139" PRIMARY KEY ("id", "card"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "race" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_0da77d4ac727f9c13e67166fa88" UNIQUE ("name"), CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifiant" integer NOT NULL, "name" character varying NOT NULL, "enName" character varying NOT NULL, "description" character varying NOT NULL, "atk" integer, "def" integer, "level" integer, "scale" integer, "linkVal" integer, "imageUrl" character varying NOT NULL, "imageUrlSmall" character varying NOT NULL, "typeId" uuid, "frameTypeId" uuid, "raceId" uuid, "archetypeId" uuid, "attributeId" uuid, "priceId" uuid, "priceCard" uuid, CONSTRAINT "UQ_a35ca021e9bd10a112e873798a2" UNIQUE ("identifiant"), CONSTRAINT "REL_d4c5d196be9601937baf20260b" UNIQUE ("priceId", "priceCard"), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "archetype" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_5983c4f1a8b74d5c4c15aa4f874" UNIQUE ("name"), CONSTRAINT "PK_f4652fa7138e051451a43149f02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_linkMarker" ("linkMarkerId" uuid NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_df5ff34146412620443f5da111f" PRIMARY KEY ("linkMarkerId", "cardId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_12a4f7435dd7c5faf0ced760bd" ON "card_linkMarker" ("linkMarkerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1bcc8acc299e5f850466d63f9b" ON "card_linkMarker" ("cardId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "FK_58ff6a62002852a350195f2ff7b" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "FK_453b2172fba879d5e0eb436cfc7" FOREIGN KEY ("setId") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "FK_6374087303b7f61153244065e1c" FOREIGN KEY ("rarityId") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_5d21e3b7b80eee10fa0bd7ac910" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_89f4ce8ff7f2618884e7b75c026" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_69994b57086543d27d9ee8bdb56" FOREIGN KEY ("frameTypeId") REFERENCES "frame_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_67bc7fb11ed0cbfe76fee520f60" FOREIGN KEY ("raceId") REFERENCES "race"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_97b6f534a0c35675c36631deb4e" FOREIGN KEY ("archetypeId") REFERENCES "archetype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_1012d0af9145496f76476ff84a6" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_d4c5d196be9601937baf20260b7" FOREIGN KEY ("priceId", "priceCard") REFERENCES "price"("id","card") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_linkMarker" ADD CONSTRAINT "FK_12a4f7435dd7c5faf0ced760bd2" FOREIGN KEY ("linkMarkerId") REFERENCES "link_marker"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_linkMarker" ADD CONSTRAINT "FK_1bcc8acc299e5f850466d63f9b0" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card_linkMarker" DROP CONSTRAINT "FK_1bcc8acc299e5f850466d63f9b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_linkMarker" DROP CONSTRAINT "FK_12a4f7435dd7c5faf0ced760bd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_d4c5d196be9601937baf20260b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_1012d0af9145496f76476ff84a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_97b6f534a0c35675c36631deb4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_67bc7fb11ed0cbfe76fee520f60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_69994b57086543d27d9ee8bdb56"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_89f4ce8ff7f2618884e7b75c026"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_5d21e3b7b80eee10fa0bd7ac910"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "FK_6374087303b7f61153244065e1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "FK_453b2172fba879d5e0eb436cfc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "FK_58ff6a62002852a350195f2ff7b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1bcc8acc299e5f850466d63f9b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_12a4f7435dd7c5faf0ced760bd"`,
    );
    await queryRunner.query(`DROP TABLE "card_linkMarker"`);
    await queryRunner.query(`DROP TABLE "archetype"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "type"`);
    await queryRunner.query(`DROP TABLE "race"`);
    await queryRunner.query(`DROP TABLE "price"`);
    await queryRunner.query(`DROP TABLE "link_marker"`);
    await queryRunner.query(`DROP TABLE "frame_type"`);
    await queryRunner.query(`DROP TABLE "attribute"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a65857537fd8e462049724d69"`,
    );
    await queryRunner.query(`DROP TABLE "card_set"`);
    await queryRunner.query(`DROP TABLE "rarity"`);
    await queryRunner.query(`DROP TABLE "set"`);
  }
}
