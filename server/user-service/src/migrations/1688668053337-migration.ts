import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688668053337 implements MigrationInterface {
    name = 'migration1688668053337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "currentPrice" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "currentPrice" DROP DEFAULT`);
    }

}
