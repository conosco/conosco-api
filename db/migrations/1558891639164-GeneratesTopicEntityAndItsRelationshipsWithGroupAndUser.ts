import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneratesTopicEntityAndItsRelationshipsWithGroupAndUser1558891639164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "text" text NOT NULL, "image_url" character varying(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "groupId" integer, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_106101142fbf646320c4d7ae231" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_3a75f2197bbc84974ac2aba1e57" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_3a75f2197bbc84974ac2aba1e57"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_106101142fbf646320c4d7ae231"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
