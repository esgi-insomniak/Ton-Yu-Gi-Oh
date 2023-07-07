import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688690147396 implements MigrationInterface {
    name = 'migration1688690147396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "minimalPrice"`);
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "currentPrice" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "currentPrice" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "minimalPrice" numeric NOT NULL`);
    }

}
