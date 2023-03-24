import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679668505455 implements MigrationInterface {
  name = 'migration1679668505455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" double precision NOT NULL, "cardId" uuid, "setId" uuid, "rarityId" uuid, CONSTRAINT "PK_d0a1f698623cc95750422e1aeae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_73876c376740cb2db46cf3f3db" ON "card_set" ("cardId", "setId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "frame_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a167e239d0ff4a0abdd7df9fd79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "link_marker" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_2a7ed84dd6c35f4bdbaf9d3964a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardMarketPrice" double precision NOT NULL, "tcgPlayerPrice" double precision NOT NULL, "ebayPrice" double precision NOT NULL, "amazonPrice" double precision NOT NULL, "coolStuffIncPrice" double precision NOT NULL, "cardId" uuid, CONSTRAINT "REL_5d21e3b7b80eee10fa0bd7ac91" UNIQUE ("cardId"), CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "race" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identifiant" integer NOT NULL, "name" character varying NOT NULL, "enName" character varying NOT NULL, "description" character varying NOT NULL, "atk" integer, "def" integer, "level" integer, "scale" integer, "linkVal" integer, "imageUrl" character varying NOT NULL, "imageUrlSmall" character varying NOT NULL, "typeId" uuid, "frameTypeId" uuid, "raceId" uuid, "archetypeId" uuid, "attributeId" uuid, "priceId" uuid, CONSTRAINT "UQ_a35ca021e9bd10a112e873798a2" UNIQUE ("identifiant"), CONSTRAINT "REL_e6ba6529c2a8caa86b0bf2f877" UNIQUE ("priceId"), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "archetype" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f4652fa7138e051451a43149f02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_link_marker" ("card_id" uuid NOT NULL, "linkMarker_id" uuid NOT NULL, CONSTRAINT "PK_00335d0f3f94ec9cc2b8e0fd046" PRIMARY KEY ("card_id", "linkMarker_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aea15e792aca718e45e1ca9af4" ON "card_link_marker" ("card_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8f183125b06f953e4f378cc0f" ON "card_link_marker" ("linkMarker_id") `,
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
      `ALTER TABLE "card" ADD CONSTRAINT "FK_e6ba6529c2a8caa86b0bf2f8778" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_link_marker" ADD CONSTRAINT "FK_aea15e792aca718e45e1ca9af42" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_link_marker" ADD CONSTRAINT "FK_e8f183125b06f953e4f378cc0f0" FOREIGN KEY ("linkMarker_id") REFERENCES "link_marker"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card_link_marker" DROP CONSTRAINT "FK_e8f183125b06f953e4f378cc0f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_link_marker" DROP CONSTRAINT "FK_aea15e792aca718e45e1ca9af42"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_e6ba6529c2a8caa86b0bf2f8778"`,
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
      `DROP INDEX "public"."IDX_e8f183125b06f953e4f378cc0f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aea15e792aca718e45e1ca9af4"`,
    );
    await queryRunner.query(`DROP TABLE "card_link_marker"`);
    await queryRunner.query(`DROP TABLE "archetype"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "type"`);
    await queryRunner.query(`DROP TABLE "race"`);
    await queryRunner.query(`DROP TABLE "price"`);
    await queryRunner.query(`DROP TABLE "link_marker"`);
    await queryRunner.query(`DROP TABLE "frame_type"`);
    await queryRunner.query(`DROP TABLE "attribute"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73876c376740cb2db46cf3f3db"`,
    );
    await queryRunner.query(`DROP TABLE "card_set"`);
    await queryRunner.query(`DROP TABLE "rarity"`);
    await queryRunner.query(`DROP TABLE "set"`);
  }
}
