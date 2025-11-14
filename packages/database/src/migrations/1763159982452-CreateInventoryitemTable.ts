import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateInventoryitemTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'barcode',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'supplier_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'inventory_items',
      new TableForeignKey({
        name: 'fk_inventory_items_supplier_id',
        columnNames: ['supplier_id'],
        referencedTableName: 'suppliers',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'inventory_items',
      new TableIndex({
        name: 'uk_inventory_items_barcode',
        columnNames: ['barcode'],
        isUnique: true,
      })
    );

    await queryRunner.createIndex(
      'inventory_items',
      new TableIndex({
        name: 'idx_inventory_items_supplier_id',
        columnNames: ['supplier_id'],
      })
    );

    await queryRunner.createIndex(
      'inventory_items',
      new TableIndex({
        name: 'idx_inventory_items_supplier_id',
        columnNames: ['supplier_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('inventory_items', 'uk_inventory_items_barcode');
    await queryRunner.dropIndex('inventory_items', 'idx_inventory_items_supplier_id');
    await queryRunner.dropForeignKey('inventory_items', 'fk_inventory_items_supplier_id');
    await queryRunner.dropTable('inventory_items');
  }
}
