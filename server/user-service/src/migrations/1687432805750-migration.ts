import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1687432805750 implements MigrationInterface {
  name = 'migration1687432805750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile_picture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "path" character varying NOT NULL, CONSTRAINT "UQ_d70f2e6d290b4a456e352ff5e3d" UNIQUE ("name"), CONSTRAINT "PK_bff7cf5dab19806d713071f0f84" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_relation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isBlocked" boolean NOT NULL, "relationOwnerId" uuid, "targetUserId" uuid, CONSTRAINT "PK_5c0ceea627fc59f56b6df0c33d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_de117b857738fd9e0b2c24f1cd" ON "user_relation" ("relationOwnerId", "targetUserId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_exchange" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerAccepted" boolean NOT NULL DEFAULT false, "targetAccepted" boolean NOT NULL DEFAULT false, "isClosed" boolean NOT NULL DEFAULT false, "ownerCoinsProposed" integer NOT NULL DEFAULT '0', "targetCoinsProposed" integer NOT NULL DEFAULT '0', "ownerCardSetsProposed" uuid array NOT NULL, "targetCardSetsProposed" uuid array NOT NULL, "exchangeOwnerId" uuid, "exchangeTargetId" uuid, CONSTRAINT "PK_f9fb61ad6fdfa8703ba8e98530e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isOnline" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "profilePictureId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_relation" ADD CONSTRAINT "FK_1d977ad444816b405245645675a" FOREIGN KEY ("relationOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_relation" ADD CONSTRAINT "FK_6a13644734f0af650214fab6e03" FOREIGN KEY ("targetUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exchange" ADD CONSTRAINT "FK_2f84b4ad415961b30644d99c8e4" FOREIGN KEY ("exchangeOwnerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exchange" ADD CONSTRAINT "FK_dad779ca884291a50317d94c728" FOREIGN KEY ("exchangeTargetId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "profile_picture"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exchange" DROP CONSTRAINT "FK_dad779ca884291a50317d94c728"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_exchange" DROP CONSTRAINT "FK_2f84b4ad415961b30644d99c8e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_relation" DROP CONSTRAINT "FK_6a13644734f0af650214fab6e03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_relation" DROP CONSTRAINT "FK_1d977ad444816b405245645675a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "profilePictureId"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isOnline"`);
    await queryRunner.query(`DROP TABLE "user_exchange"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_de117b857738fd9e0b2c24f1cd"`,
    );
    await queryRunner.query(`DROP TABLE "user_relation"`);
    await queryRunner.query(`DROP TABLE "profile_picture"`);
  }
}
