import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsProfilePicUserTable1557343192110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profile_pic" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_2f0f8b4b0cde33e1bedf6f3dd4a" UNIQUE ("profile_pic")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_2f0f8b4b0cde33e1bedf6f3dd4a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profile_pic"`);
    }

}
