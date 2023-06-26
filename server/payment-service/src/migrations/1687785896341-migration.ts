import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1687785896341 implements MigrationInterface {
  name = 'migration1687785896341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_history" ADD "sessionId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_history" ADD CONSTRAINT "UQ_8075b121d25c3c76593a9b949b2" UNIQUE ("sessionId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_history" DROP CONSTRAINT "UQ_8075b121d25c3c76593a9b949b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_history" DROP COLUMN "sessionId"`,
    );
  }
}
