import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1687534496534 implements MigrationInterface {
  name = 'migration1687534496534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "duel_player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "username" character varying NOT NULL, "lifePoints" integer NOT NULL DEFAULT '8000', "turnToPlay" boolean NOT NULL DEFAULT false, "cardsInHand" uuid array NOT NULL DEFAULT '{}', "cardsInDeck" uuid array NOT NULL DEFAULT '{}', "cardsInGraveyard" uuid array NOT NULL DEFAULT '{}', "cardsInField" uuid array NOT NULL DEFAULT '{}', "duelId" uuid, CONSTRAINT "PK_de0addd9029c1b2b984db9f0516" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5483694fee04b76f394b28fee4" ON "duel_player" ("userId", "duelId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "duel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomId" character varying NOT NULL, "hasStarted" boolean NOT NULL DEFAULT false, "isOver" boolean NOT NULL DEFAULT false, "timePerTurn" integer NOT NULL DEFAULT '90', "winnerId" uuid, CONSTRAINT "PK_1575a4255b3bdf1f11398841d0d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "duel_player" ADD CONSTRAINT "FK_548f1afdc5d536dd42060c70cfd" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "duel_player" DROP CONSTRAINT "FK_548f1afdc5d536dd42060c70cfd"`,
    );
    await queryRunner.query(`DROP TABLE "duel"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5483694fee04b76f394b28fee4"`,
    );
    await queryRunner.query(`DROP TABLE "duel_player"`);
  }
}
