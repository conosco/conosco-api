import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovesUniqueKeyFromProfilePicAtUserTable1557512483845
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_2f0f8b4b0cde33e1bedf6f3dd4a"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_2f0f8b4b0cde33e1bedf6f3dd4a" UNIQUE ("profile_pic")`,
    );
  }
}
