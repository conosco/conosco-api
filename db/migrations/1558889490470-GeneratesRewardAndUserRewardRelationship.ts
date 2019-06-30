import {MigrationInterface, QueryRunner} from 'typeorm';

export class GeneratesRewardAndUserRewardRelationship1558889490470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reward" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_reward" ("user_id" integer NOT NULL, "reward_id" integer NOT NULL, CONSTRAINT "PK_eacbe956bedfe76d5881bec9456" PRIMARY KEY ("user_id", "reward_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1af1d9aa9a9f2483339a7fd68" ON "user_reward" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_610e50c29c8f4ef953f444481d" ON "user_reward" ("reward_id") `);
        await queryRunner.query(`ALTER TABLE "user_reward" ADD CONSTRAINT "FK_e1af1d9aa9a9f2483339a7fd681" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_reward" ADD CONSTRAINT "FK_610e50c29c8f4ef953f444481d2" FOREIGN KEY ("reward_id") REFERENCES "reward"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_reward" DROP CONSTRAINT "FK_610e50c29c8f4ef953f444481d2"`);
        await queryRunner.query(`ALTER TABLE "user_reward" DROP CONSTRAINT "FK_e1af1d9aa9a9f2483339a7fd681"`);
        await queryRunner.query(`DROP INDEX "IDX_610e50c29c8f4ef953f444481d"`);
        await queryRunner.query(`DROP INDEX "IDX_e1af1d9aa9a9f2483339a7fd68"`);
        await queryRunner.query(`DROP TABLE "user_reward"`);
        await queryRunner.query(`DROP TABLE "reward"`);
    }

}
