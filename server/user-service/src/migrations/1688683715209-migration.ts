import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688683715209 implements MigrationInterface {
    name = 'migration1688683715209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_939a514c54bb27aeea686f429db"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "auctionHistoriesId"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD "auctionId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_a9b75b1dbd49d90df8afc7d2481"`);
        await queryRunner.query(`ALTER TABLE "auction_history" DROP COLUMN "auctionId"`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "auctionHistoriesId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction" ADD CONSTRAINT "FK_939a514c54bb27aeea686f429db" FOREIGN KEY ("auctionHistoriesId") REFERENCES "auction_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
