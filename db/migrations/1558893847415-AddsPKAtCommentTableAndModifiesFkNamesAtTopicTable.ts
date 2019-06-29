import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddsPKAtCommentTableAndModifiesFkNamesAtTopicTable1558893847415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_106101142fbf646320c4d7ae231"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_3a75f2197bbc84974ac2aba1e57"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "group_id" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_3774111ed703f9018369dcef22e"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0d89eeeb32cca0b6be4980742f5" PRIMARY KEY ("user_id", "topic_id", "id")`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_d6246b640ebd2a2886694d2367c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_ddcb2818354367b6f68f07e620e" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_ddcb2818354367b6f68f07e620e"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_d6246b640ebd2a2886694d2367c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0d89eeeb32cca0b6be4980742f5"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_3774111ed703f9018369dcef22e" PRIMARY KEY ("user_id", "topic_id")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "group_id"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "groupId" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_3a75f2197bbc84974ac2aba1e57" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_106101142fbf646320c4d7ae231" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
