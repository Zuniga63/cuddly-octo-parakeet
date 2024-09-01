import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentMethodTable1725217867544 implements MigrationInterface {
  name = 'AddPaymentMethodTable1725217867544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "isEnabled" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bank_id" uuid, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_cdbbe527a066c070337335f05b6" FOREIGN KEY ("bank_id") REFERENCES "bank"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment_method" DROP CONSTRAINT "FK_cdbbe527a066c070337335f05b6"`);
    await queryRunner.query(`DROP TABLE "payment_method"`);
  }
}
