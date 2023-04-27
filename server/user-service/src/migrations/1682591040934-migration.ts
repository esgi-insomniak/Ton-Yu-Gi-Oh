import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1682591040934 implements MigrationInterface {
  name = 'migration1682591040934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`,
    );
  }
}
