import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateForeignKeysTopic1560107810702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_106101142fbf646320c4d7ae231"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_d6246b640ebd2a2886694d2367c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_d6246b640ebd2a2886694d2367c"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_106101142fbf646320c4d7ae231" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
