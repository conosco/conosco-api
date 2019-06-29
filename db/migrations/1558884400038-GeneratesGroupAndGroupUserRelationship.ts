import {MigrationInterface, QueryRunner} from 'typeorm';

export class GeneratesGroupAndGroupUserRelationship1558884400038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_group" ("user" integer NOT NULL, "group" integer NOT NULL, CONSTRAINT "PK_40d3fef5121e8af8781761910ec" PRIMARY KEY ("user", "group"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25d039b174a23f78a0c4a6fae1" ON "user_group" ("user") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dcda02308ef76d3b04fd17f68" ON "user_group" ("group") `);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_25d039b174a23f78a0c4a6fae1e" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_1dcda02308ef76d3b04fd17f681" FOREIGN KEY ("group") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_1dcda02308ef76d3b04fd17f681"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_25d039b174a23f78a0c4a6fae1e"`);
        await queryRunner.query(`DROP INDEX "IDX_1dcda02308ef76d3b04fd17f68"`);
        await queryRunner.query(`DROP INDEX "IDX_25d039b174a23f78a0c4a6fae1"`);
        await queryRunner.query(`DROP TABLE "user_group"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
