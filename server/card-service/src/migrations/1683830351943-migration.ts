import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1683830351943 implements MigrationInterface {
  name = 'migration1683830351943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a65857537fd8e462049724d69"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "PK_8a16655353de96bb442a27aa50d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "PK_62ea50a158ab68756f2d6b6812c" PRIMARY KEY ("id", "set")`,
    );
    await queryRunner.query(`ALTER TABLE "card_set" DROP COLUMN "card"`);
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "PK_62ea50a158ab68756f2d6b6812c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "PK_d0a1f698623cc95750422e1aeae" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "card_set" DROP COLUMN "set"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_73876c376740cb2db46cf3f3db" ON "card_set" ("cardId", "setId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_73876c376740cb2db46cf3f3db"`,
    );
    await queryRunner.query(`ALTER TABLE "card_set" ADD "set" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "PK_d0a1f698623cc95750422e1aeae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "PK_62ea50a158ab68756f2d6b6812c" PRIMARY KEY ("id", "set")`,
    );
    await queryRunner.query(`ALTER TABLE "card_set" ADD "card" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "card_set" DROP CONSTRAINT "PK_62ea50a158ab68756f2d6b6812c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card_set" ADD CONSTRAINT "PK_8a16655353de96bb442a27aa50d" PRIMARY KEY ("id", "card", "set")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2a65857537fd8e462049724d69" ON "card_set" ("card", "set") `,
    );
  }
}
