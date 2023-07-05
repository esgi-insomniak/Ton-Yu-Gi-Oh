import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1688552371434 implements MigrationInterface {
  name = 'Migration1688552371434';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD "deckUserCardSets" jsonb DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP COLUMN "deckUserCardSets"`,
    );
  }
}
