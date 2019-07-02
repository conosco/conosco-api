import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddsCreatedAndUpdatedAtGroupsTable1558885080374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "group" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "created_at"`);
    }

}
