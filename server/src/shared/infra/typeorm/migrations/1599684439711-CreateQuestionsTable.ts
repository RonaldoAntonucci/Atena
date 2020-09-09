import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateQuestionsTable1599684439711
  implements MigrationInterface {
  private table = new Table({
    name: 'questions',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'title',
        type: 'varchar',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'text',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'disabledAt',
        type: 'timestamp',
        isNullable: true,
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
