import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsIconUrlColumnAtRewardAndGroupTable1558889711797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reward" ADD "icon_url" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "group" ADD "icon_url" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "icon_url"`);
        await queryRunner.query(`ALTER TABLE "reward" DROP COLUMN "icon_url"`);
    }

}
