import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateShortUrlsTable1744260818169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "short_url",
        columns: [
          {
            name: "id",
            type: "char",
            length: "6",
            isPrimary: true,
            primaryKeyConstraintName: "PK_short_urls_id",
          },
          {
            name: "original_url",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      "short_urls",
      new TableIndex({
        name: "short_urls_id_idx",
        columnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("short_urls", "short_urls_id_idx");
    await queryRunner.dropTable("short_urls");
  }
}
