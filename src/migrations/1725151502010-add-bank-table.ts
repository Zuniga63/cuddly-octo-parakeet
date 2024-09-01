import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBankTable1725151502010 implements MigrationInterface {
  name = 'AddBankTable1725151502010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bank" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "holder" text NOT NULL, "account_number" text NOT NULL, "isEnabled" boolean NOT NULL DEFAULT true, "balance" numeric(12,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bank"`);
  }
}
