import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTagDescription1759947051913 implements MigrationInterface {
  name = 'AddTagDescription1759947051913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tag\` ADD \`description\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`description\``);
  }
}
