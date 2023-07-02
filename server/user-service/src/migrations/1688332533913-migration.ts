import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1688332533913 implements MigrationInterface {
  name = 'migration1688332533913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{user}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`,
    );
  }
}
