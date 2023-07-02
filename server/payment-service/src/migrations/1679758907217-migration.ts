import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679758907217 implements MigrationInterface {
  name = 'migration1679758907217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "coinsAmount" integer NOT NULL, "stripeInfo" text NOT NULL, CONSTRAINT "PK_5fcec51a769b65c0c3c0987f11c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_history"`);
  }
}
