import {MigrationInterface, QueryRunner} from 'typeorm';

export class UpdateForeignKeysTopic1560108102014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_ddcb2818354367b6f68f07e620e"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c"`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "group_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "topic_type_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_ddcb2818354367b6f68f07e620e" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c" FOREIGN KEY ("topic_type_id") REFERENCES "topic_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_ddcb2818354367b6f68f07e620e"`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "topic_type_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "group_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c" FOREIGN KEY ("topic_type_id") REFERENCES "topic_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_ddcb2818354367b6f68f07e620e" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
