import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class inital1654621862970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const messageTableExists = await queryRunner.hasTable("message");
    if (!messageTableExists) {
      await queryRunner.createTable(
        new Table({
          name: "message",
          columns: [
            {
              name: "id",
              isPrimary: true,
              type: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "message",
              type: "character varying",
              isNullable: false,
            },
            {
              name: "date",
              type: "timestamp",
            },
            {
              name: "createdAt",
              type: "timestamp",
              default: "now()",
            },
          ],
        }),
        true
      );
    }
    const userTableExists = await queryRunner.hasTable("message");
    if (!userTableExists) {
      await queryRunner.createTable(
        new Table({
          name: "message",
          columns: [
            {
              name: "id",
              isPrimary: true,
              type: "uuid",
              default: "uuid_generate_v4()",
            },
            {
              name: "firstName",
              type: "character varying",
              isNullable: false,
            },
            {
              name: "lastName",
              type: "character varying",
              isNullable: false,
            },
            {
              name: "email",
              type: "character varying",
              isNullable: false,
            },
            {
              name: "createdAt",
              type: "timestamp",
              default: "now()",
            },
          ],
        }),
        true
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("message");
    await queryRunner.dropTable("user");
  }
}
