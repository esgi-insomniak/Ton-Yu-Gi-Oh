import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1688478767842 implements MigrationInterface {
  name = 'Migration1688478767842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5483694fee04b76f394b28fee4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP COLUMN "turnToPlay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP COLUMN "cardsInGraveyard"`,
    );
    await queryRunner.query(`ALTER TABLE "duel" DROP COLUMN "winnerId"`);
    await queryRunner.query(`ALTER TABLE "duel_player" ADD "deckId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "duel" ADD "timeToSelectDeck" integer NOT NULL DEFAULT '90'`,
    );
    await queryRunner.query(`ALTER TABLE "duel" ADD "playerToPlay" uuid`);
    await queryRunner.query(`ALTER TABLE "duel" ADD "winner" uuid`);
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD CONSTRAINT "UQ_40bffd9c3aa9554a7375afb9853" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP COLUMN "cardsInField"`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD "cardsInField" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP COLUMN "cardsInField"`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD "cardsInField" uuid array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP CONSTRAINT "UQ_40bffd9c3aa9554a7375afb9853"`,
    );
    await queryRunner.query(`ALTER TABLE "duel" DROP COLUMN "winner"`);
    await queryRunner.query(`ALTER TABLE "duel" DROP COLUMN "playerToPlay"`);
    await queryRunner.query(
      `ALTER TABLE "duel" DROP COLUMN "timeToSelectDeck"`,
    );
    await queryRunner.query(`ALTER TABLE "duel_player" DROP COLUMN "deckId"`);
    await queryRunner.query(`ALTER TABLE "duel" ADD "winnerId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD "cardsInGraveyard" uuid array NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD "turnToPlay" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5483694fee04b76f394b28fee4" ON "duel_player" ("userId", "duelId") `,
    );
  }
}
