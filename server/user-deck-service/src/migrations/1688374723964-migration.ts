import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1688374723964 implements MigrationInterface {
  name = 'migration1688374723964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0082ae05cca979b91b7caae009" ON "user_deck" ("userId", "name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0082ae05cca979b91b7caae009"`,
    );
  }
}
