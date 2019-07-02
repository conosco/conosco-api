import {MigrationInterface, QueryRunner} from 'typeorm';

export class ModifiesColumnsNamesAtUserGroupJoinTable1558884455546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_25d039b174a23f78a0c4a6fae1e"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_1dcda02308ef76d3b04fd17f681"`);
        await queryRunner.query(`DROP INDEX "IDX_25d039b174a23f78a0c4a6fae1"`);
        await queryRunner.query(`DROP INDEX "IDX_1dcda02308ef76d3b04fd17f68"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_40d3fef5121e8af8781761910ec"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_1dcda02308ef76d3b04fd17f681" PRIMARY KEY ("group")`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_1dcda02308ef76d3b04fd17f681"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "group"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_7ded8f984bbc2ee6ff0beee491b" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "group_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_7ded8f984bbc2ee6ff0beee491b"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_bd332ba499e012f8d20905f8061" PRIMARY KEY ("user_id", "group_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_7ded8f984bbc2ee6ff0beee491" ON "user_group" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb9982562cca83afb76c0ddc0d" ON "user_group" ("group_id") `);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_7ded8f984bbc2ee6ff0beee491b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_bb9982562cca83afb76c0ddc0d6" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_bb9982562cca83afb76c0ddc0d6"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "FK_7ded8f984bbc2ee6ff0beee491b"`);
        await queryRunner.query(`DROP INDEX "IDX_bb9982562cca83afb76c0ddc0d"`);
        await queryRunner.query(`DROP INDEX "IDX_7ded8f984bbc2ee6ff0beee491"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_bd332ba499e012f8d20905f8061"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_7ded8f984bbc2ee6ff0beee491b" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_7ded8f984bbc2ee6ff0beee491b"`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "group" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_1dcda02308ef76d3b04fd17f681" PRIMARY KEY ("group")`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD "user" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_group" DROP CONSTRAINT "PK_1dcda02308ef76d3b04fd17f681"`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "PK_40d3fef5121e8af8781761910ec" PRIMARY KEY ("user", "group")`);
        await queryRunner.query(`CREATE INDEX "IDX_1dcda02308ef76d3b04fd17f68" ON "user_group" ("group") `);
        await queryRunner.query(`CREATE INDEX "IDX_25d039b174a23f78a0c4a6fae1" ON "user_group" ("user") `);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_1dcda02308ef76d3b04fd17f681" FOREIGN KEY ("group") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_group" ADD CONSTRAINT "FK_25d039b174a23f78a0c4a6fae1e" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
