import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createCryptoCurrencyTable1673936446742 implements MigrationInterface {
    name = 'createCryptoCurrencyTable1673936446742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cryptocurrency',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'coin_name', type: 'varchar', isUnique: true },
                    { name: 'symbol', type: 'varchar', isUnique: true },
                    { name: 'price', type: 'double precision' },
                    { name: 'description', type: 'varchar', isNullable: true },
                    { name: 'user_id', type: 'bigint' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: 'cryptocurrency_history',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'price', type: 'double precision' },
                    { name: 'cryptocurrency_id', type: 'bigint' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now()' },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            }),
            true,
        );

        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();

        await queryRunner.createForeignKey(
            'cryptocurrency',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );


        await queryRunner.createForeignKey(
            'cryptocurrency_history',
            new TableForeignKey({
                columnNames: ['cryptocurrency_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'cryptocurrency',
                onDelete: 'CASCADE',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(`cryptocurrency`);
        await queryRunner.dropTable(`cryptocurrency_history`);
    }

}
