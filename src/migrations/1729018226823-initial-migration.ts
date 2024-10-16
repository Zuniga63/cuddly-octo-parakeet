import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1729018226823 implements MigrationInterface {
  name = 'InitialMigration1729018226823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "permissions" text array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip_address" character varying(45) NOT NULL, "user_agent" text, "last_activity" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_c0d3e43ae2fc42f035d710dc44" ON "session" ("last_activity") `);
    await queryRunner.query(
      `CREATE TYPE "public"."image_resource_provider_enum" AS ENUM('cloudinary', 'aws', 'google')`,
    );
    await queryRunner.query(
      `CREATE TABLE "image_resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "file_name" text, "public_id" text, "width" integer, "height" integer, "format" text, "size" integer, "provider" "public"."image_resource_provider_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e91b9eb58a096638369851bf2a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "email" text NOT NULL, "password" text, "email_verified_at" TIMESTAMP, "is_super_user" boolean NOT NULL DEFAULT false, "is_admin" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role_id" uuid, "profile_photo_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bbc5801373f2845b85be46ff07" UNIQUE ("profile_photo_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_bbc5801373f2845b85be46ff076" FOREIGN KEY ("profile_photo_id") REFERENCES "image_resource"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bbc5801373f2845b85be46ff076"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
    await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_30e98e8746699fb9af235410aff"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "image_resource"`);
    await queryRunner.query(`DROP TYPE "public"."image_resource_provider_enum"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_c0d3e43ae2fc42f035d710dc44"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
