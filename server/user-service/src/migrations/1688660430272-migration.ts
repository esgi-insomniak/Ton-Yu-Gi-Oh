import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688660430272 implements MigrationInterface {
    name = 'migration1688660430272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_a5e201ad74508f64d053ee508c7"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "userCardSetId"`);
        await queryRunner.query(`ALTER TABLE "auction_history" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "cardSetId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "auctionHistoriesId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "isClosed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "auction_history" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auction" ADD CONSTRAINT "FK_939a514c54bb27aeea686f429db" FOREIGN KEY ("auctionHistoriesId") REFERENCES "auction_history"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_d67ca31a47b3e8a6d3b859d2ca8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_d67ca31a47b3e8a6d3b859d2ca8"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP CONSTRAINT "FK_939a514c54bb27aeea686f429db"`);
        await queryRunner.query(`ALTER TABLE "auction_history" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auction" ALTER COLUMN "isClosed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "createdAt" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auction_history" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "auctionHistoriesId"`);
        await queryRunner.query(`ALTER TABLE "auction" DROP COLUMN "cardSetId"`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "auction" ADD "userCardSetId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_a5e201ad74508f64d053ee508c7" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
