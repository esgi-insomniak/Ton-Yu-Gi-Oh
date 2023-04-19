import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1681739191091 implements MigrationInterface {
  name = 'migration1681739191091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "PK_dc787b58d7790849831bd0c73fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_card_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "cardSetId" uuid NOT NULL, CONSTRAINT "PK_ade23589385b306d330dce966fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "setId" uuid NOT NULL, CONSTRAINT "PK_333e51eb56d6f3aa34f645bba51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deck_cardSet" ("userDeckId" uuid NOT NULL, "userCardSetId" uuid NOT NULL, CONSTRAINT "PK_181a2b36e24cdf80bde12419f04" PRIMARY KEY ("userDeckId", "userCardSetId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_deed1932b2d309c8c706e1d094" ON "deck_cardSet" ("userDeckId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9b15b95728698bf1dacedaedd6" ON "deck_cardSet" ("userCardSetId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_cardSet" ADD CONSTRAINT "FK_deed1932b2d309c8c706e1d0942" FOREIGN KEY ("userDeckId") REFERENCES "user_deck"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_cardSet" ADD CONSTRAINT "FK_9b15b95728698bf1dacedaedd68" FOREIGN KEY ("userCardSetId") REFERENCES "user_card_set"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deck_cardSet" DROP CONSTRAINT "FK_9b15b95728698bf1dacedaedd68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_cardSet" DROP CONSTRAINT "FK_deed1932b2d309c8c706e1d0942"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9b15b95728698bf1dacedaedd6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_deed1932b2d309c8c706e1d094"`,
    );
    await queryRunner.query(`DROP TABLE "deck_cardSet"`);
    await queryRunner.query(`DROP TABLE "user_set"`);
    await queryRunner.query(`DROP TABLE "user_card_set"`);
    await queryRunner.query(`DROP TABLE "user_deck"`);
  }
}
