import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUserTable1673936314985 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'lastName', type: 'varchar' },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'country', type: 'varchar', isNullable: true },
          { name: 'role', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`user`);
  }

}
