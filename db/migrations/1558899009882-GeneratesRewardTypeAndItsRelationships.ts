import {MigrationInterface, QueryRunner} from 'typeorm';

export class GeneratesRewardTypeAndItsRelationships1558899009882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "reward_type" ("id" SERIAL NOT NULL, "type" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3e64e4f49b70bcff11ebad21aa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reward" ADD "reward_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "reward" ADD CONSTRAINT "FK_5e25f74b606ba9e9c510fc0bd2c" FOREIGN KEY ("reward_type_id") REFERENCES "reward_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward" DROP CONSTRAINT "FK_5e25f74b606ba9e9c510fc0bd2c"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "reward_type_id"`);
        await queryRunner.query(`DROP TABLE "reward_type"`);
    }

}
