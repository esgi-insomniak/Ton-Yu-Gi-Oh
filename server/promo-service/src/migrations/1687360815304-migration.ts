import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687360815304 implements MigrationInterface {
  name = 'Migration1687360815304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "promo_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "rewardCoinsAmount" integer, "rewardSetId" character varying, "rewardSetAmount" integer, "expirationDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_a456233366901b110f09fe478e9" UNIQUE ("code"), CONSTRAINT "PK_ded0af550884c7ab3e345e76d73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "claimed_promo_code" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "promoCodeId" uuid NOT NULL, CONSTRAINT "PK_2665a62850c5635ac8a416e5bde" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_425b07e1050cc7f44c09ca92d0" ON "claimed_promo_code" ("userId", "promoCodeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" ADD CONSTRAINT "FK_004712151d5700496aa3f1b69cb" FOREIGN KEY ("promoCodeId") REFERENCES "promo_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" DROP CONSTRAINT "FK_004712151d5700496aa3f1b69cb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_425b07e1050cc7f44c09ca92d0"`,
    );
    await queryRunner.query(`DROP TABLE "claimed_promo_code"`);
    await queryRunner.query(`DROP TABLE "promo_code"`);
  }
}
