import {MigrationInterface, QueryRunner} from "typeorm";

export class GeneratesHabitEntityAndItsRelationshipWithGroup1558896258016 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "habit" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "icon_url" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_71654d5d0512043db43bac9abfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_habit" ("group_id" integer NOT NULL, "habit_id" integer NOT NULL, CONSTRAINT "PK_85669ba3243ae76679c76bc2544" PRIMARY KEY ("group_id", "habit_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5fc9d5d458ebfee3a566a0e877" ON "group_habit" ("group_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aa7648dbaa1d6bf09ad1c2dbfe" ON "group_habit" ("habit_id") `);
        await queryRunner.query(`ALTER TABLE "group_habit" ADD CONSTRAINT "FK_5fc9d5d458ebfee3a566a0e8776" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_habit" ADD CONSTRAINT "FK_aa7648dbaa1d6bf09ad1c2dbfe5" FOREIGN KEY ("habit_id") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group_habit" DROP CONSTRAINT "FK_aa7648dbaa1d6bf09ad1c2dbfe5"`);
        await queryRunner.query(`ALTER TABLE "group_habit" DROP CONSTRAINT "FK_5fc9d5d458ebfee3a566a0e8776"`);
        await queryRunner.query(`DROP INDEX "IDX_aa7648dbaa1d6bf09ad1c2dbfe"`);
        await queryRunner.query(`DROP INDEX "IDX_5fc9d5d458ebfee3a566a0e877"`);
        await queryRunner.query(`DROP TABLE "group_habit"`);
        await queryRunner.query(`DROP TABLE "habit"`);
    }

}
