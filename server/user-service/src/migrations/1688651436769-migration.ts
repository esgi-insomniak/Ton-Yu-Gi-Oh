import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1688651436769 implements MigrationInterface {
    name = 'migration1688651436769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userCardSetId" uuid NOT NULL, "createdAt" date NOT NULL, "duration" numeric NOT NULL, "minimalPrice" numeric NOT NULL, "currentPrice" numeric NOT NULL, "isClosed" boolean NOT NULL, CONSTRAINT "PK_9dc876c629273e71646cf6dfa67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auction_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "createdAt" date NOT NULL, "userIdId" uuid, CONSTRAINT "PK_3a4460a6dfd20f0677fa40cee10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auction_history" ADD CONSTRAINT "FK_a5e201ad74508f64d053ee508c7" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auction_history" DROP CONSTRAINT "FK_a5e201ad74508f64d053ee508c7"`);
        await queryRunner.query(`DROP TABLE "auction_history"`);
        await queryRunner.query(`DROP TABLE "auction"`);
    }

}
