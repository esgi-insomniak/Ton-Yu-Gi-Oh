import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679667683173 implements MigrationInterface {
  name = 'migration1679667683173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_deck" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_dc787b58d7790849831bd0c73fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "setId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_333e51eb56d6f3aa34f645bba51" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "coins" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_card_set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardSetId" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_ade23589385b306d330dce966fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deck_card_set" ("deck_id" uuid NOT NULL, "userCardSet_id" uuid NOT NULL, CONSTRAINT "PK_0e04f208ffc49ce0fdfc386534b" PRIMARY KEY ("deck_id", "userCardSet_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1915661c692f58f6087da7beca" ON "deck_card_set" ("deck_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4170d95786dd74c5c06654d098" ON "deck_card_set" ("userCardSet_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_deck" ADD CONSTRAINT "FK_cca334b9d4a102ef44fbf8aeabe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_set" ADD CONSTRAINT "FK_e57692714b335da5df5ed25e189" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_card_set" ADD CONSTRAINT "FK_8ac1dbcd7fd7c432f4709522b46" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_card_set" ADD CONSTRAINT "FK_1915661c692f58f6087da7beca0" FOREIGN KEY ("deck_id") REFERENCES "user_deck"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_card_set" ADD CONSTRAINT "FK_4170d95786dd74c5c06654d0981" FOREIGN KEY ("userCardSet_id") REFERENCES "user_card_set"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deck_card_set" DROP CONSTRAINT "FK_4170d95786dd74c5c06654d0981"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deck_card_set" DROP CONSTRAINT "FK_1915661c692f58f6087da7beca0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_card_set" DROP CONSTRAINT "FK_8ac1dbcd7fd7c432f4709522b46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_set" DROP CONSTRAINT "FK_e57692714b335da5df5ed25e189"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_deck" DROP CONSTRAINT "FK_cca334b9d4a102ef44fbf8aeabe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4170d95786dd74c5c06654d098"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1915661c692f58f6087da7beca"`,
    );
    await queryRunner.query(`DROP TABLE "deck_card_set"`);
    await queryRunner.query(`DROP TABLE "user_card_set"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_set"`);
    await queryRunner.query(`DROP TABLE "user_deck"`);
  }
}
