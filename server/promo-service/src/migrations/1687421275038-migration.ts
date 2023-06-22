import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687421275038 implements MigrationInterface {
  name = 'Migration1687421275038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" DROP CONSTRAINT "FK_004712151d5700496aa3f1b69cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" ADD CONSTRAINT "FK_004712151d5700496aa3f1b69cb" FOREIGN KEY ("promoCodeId") REFERENCES "promo_code"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" DROP CONSTRAINT "FK_004712151d5700496aa3f1b69cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "claimed_promo_code" ADD CONSTRAINT "FK_004712151d5700496aa3f1b69cb" FOREIGN KEY ("promoCodeId") REFERENCES "promo_code"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
