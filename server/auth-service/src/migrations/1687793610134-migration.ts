import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1687793610134 implements MigrationInterface {
  name = 'migration1687793610134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ipAddress" character varying NOT NULL, "userId" uuid, "isSuccess" boolean NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fe377f36d49c39547cb6b9f0727" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "login_history"`);
  }
}
