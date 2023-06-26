import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1683880704544 implements MigrationInterface {
  name = 'migration1683880704544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_deck" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_deck" DROP COLUMN "name"`);
  }
}
