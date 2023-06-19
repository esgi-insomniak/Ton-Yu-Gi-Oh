import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1687090860758 implements MigrationInterface {
  name = 'migration1687090860758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rarity_drop_table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rarityType" character varying NOT NULL, "priority" integer NOT NULL, "dropRate" double precision NOT NULL DEFAULT '0', CONSTRAINT "UQ_4a45306cae15f14826133b73836" UNIQUE ("rarityType"), CONSTRAINT "PK_690253cb61e7ff8e573834a8be6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "set" ADD "cardSetsOnOpen" integer NOT NULL DEFAULT '9'`,
    );
    await queryRunner.query(`ALTER TABLE "rarity" ADD "dropTableId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "rarity" ADD CONSTRAINT "FK_413fbd3ac5dd1d69e178e6db481" FOREIGN KEY ("dropTableId") REFERENCES "rarity_drop_table"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rarity" DROP CONSTRAINT "FK_413fbd3ac5dd1d69e178e6db481"`,
    );
    await queryRunner.query(`ALTER TABLE "rarity" DROP COLUMN "dropTableId"`);
    await queryRunner.query(`ALTER TABLE "set" DROP COLUMN "cardSetsOnOpen"`);
    await queryRunner.query(`DROP TABLE "rarity_drop_table"`);
  }
}
