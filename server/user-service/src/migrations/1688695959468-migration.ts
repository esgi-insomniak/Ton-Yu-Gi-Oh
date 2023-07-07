import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688695959468 implements MigrationInterface {
    name = 'migration1688695959468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" ADD "winnerId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction" ADD CONSTRAINT "FK_6908332e2ea30d763579027347d" FOREIGN KEY ("winnerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_6908332e2ea30d763579027347d"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "winnerId"`);
    }

}
