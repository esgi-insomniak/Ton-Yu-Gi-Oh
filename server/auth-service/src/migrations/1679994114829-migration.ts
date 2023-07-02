import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1679994114829 implements MigrationInterface {
  name = 'migration1679994114829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "basic_auth" ("userId" uuid NOT NULL, "password" character varying NOT NULL, "confirmationToken" character varying, "renewToken" character varying, CONSTRAINT "PK_5f18100cf2e7e7f3068fdf75177" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("userId" uuid NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_94f168faad896c0786646fa3d4a" PRIMARY KEY ("userId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "basic_auth"`);
  }
}
