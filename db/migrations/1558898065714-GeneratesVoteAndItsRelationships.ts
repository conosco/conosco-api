import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneratesVoteAndItsRelationships1558898065714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "vote" ("state" boolean NOT NULL, "user_id" integer NOT NULL, "topic_id" integer NOT NULL, CONSTRAINT "PK_284b58c3d1e24802cbf364d3b19" PRIMARY KEY ("user_id", "topic_id"))`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_af8728cf605f1988d2007d094f5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_67ff0055462772292ffdbd132ef" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_67ff0055462772292ffdbd132ef"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_af8728cf605f1988d2007d094f5"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
