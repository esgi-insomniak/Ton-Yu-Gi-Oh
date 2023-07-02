import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1683732386887 implements MigrationInterface {
  name = 'migration1683732386887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_5d21e3b7b80eee10fa0bd7ac910"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_d4c5d196be9601937baf20260b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "REL_d4c5d196be9601937baf20260b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "PK_b8288d2373b2e06555bfeca6139"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "card"`);
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "REL_5d21e3b7b80eee10fa0bd7ac91"`,
    );
    await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "cardId"`);
    await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "priceCard"`);
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "UQ_e6ba6529c2a8caa86b0bf2f8778" UNIQUE ("priceId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_e6ba6529c2a8caa86b0bf2f8778" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_e6ba6529c2a8caa86b0bf2f8778"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "UQ_e6ba6529c2a8caa86b0bf2f8778"`,
    );
    await queryRunner.query(`ALTER TABLE "card" ADD "priceCard" uuid`);
    await queryRunner.query(`ALTER TABLE "price" ADD "cardId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "REL_5d21e3b7b80eee10fa0bd7ac91" UNIQUE ("cardId")`,
    );
    await queryRunner.query(`ALTER TABLE "price" ADD "card" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "PK_b8288d2373b2e06555bfeca6139" PRIMARY KEY ("id", "card")`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "REL_d4c5d196be9601937baf20260b" UNIQUE ("priceId", "priceCard")`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_d4c5d196be9601937baf20260b7" FOREIGN KEY ("priceId", "priceCard") REFERENCES "price"("id","card") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_5d21e3b7b80eee10fa0bd7ac910" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
