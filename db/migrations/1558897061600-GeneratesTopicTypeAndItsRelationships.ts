import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneratesTopicTypeAndItsRelationships1558897061600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "topic_type" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96c5f727ca055c5baae66beacb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "topic_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c" FOREIGN KEY ("topic_type_id") REFERENCES "topic_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_9d581d79f8761b4860c6eeba49c"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "topic_type_id"`);
        await queryRunner.query(`DROP TABLE "topic_type"`);
    }

}
