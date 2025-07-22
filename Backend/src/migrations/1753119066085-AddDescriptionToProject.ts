import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionToProject1753119066085
  implements MigrationInterface
{
  name = 'AddDescriptionToProject1753119066085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
  }
}
