import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1688558453980 implements MigrationInterface {
  name = 'Migration1688558453980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel" ALTER COLUMN "timeToSelectDeck" SET DEFAULT '60'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel" ALTER COLUMN "timeToSelectDeck" SET DEFAULT '90'`,
    );
  }
}
