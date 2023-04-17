import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681747967671 implements MigrationInterface {
    name = 'migration1681747967671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_checkout" ADD "coins" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_checkout" DROP COLUMN "coins"`);
    }

}
