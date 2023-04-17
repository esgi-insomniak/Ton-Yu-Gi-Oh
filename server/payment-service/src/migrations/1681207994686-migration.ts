import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1681207994686 implements MigrationInterface {
  name = 'migration1681207994686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_checkout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "sessionId" character varying NOT NULL, "paymentStatus" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_b4c0924df6b422595ad91c3a85a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_checkout"`);
  }
}
