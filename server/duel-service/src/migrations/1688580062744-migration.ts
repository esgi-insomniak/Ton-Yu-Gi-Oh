import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1688580062744 implements MigrationInterface {
    name = 'Migration1688580062744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel" ADD "turn" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel" DROP COLUMN "turn"`);
    }

}
