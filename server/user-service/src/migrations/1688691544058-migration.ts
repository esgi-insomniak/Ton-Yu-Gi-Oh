import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688691544058 implements MigrationInterface {
    name = 'migration1688691544058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
