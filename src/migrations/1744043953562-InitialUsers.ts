import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class InitialUsers1744043953562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password1 = await bcrypt.hash('SuperAdmin123', 10);
    const password2 = await bcrypt.hash('User123', 10);
    await queryRunner.query(
      `INSERT INTO "users" ("email", "fullname", "password", "roles", "isActive", "createdAt", "updatedAt") 
        VALUES 
        ('admin@example.com', 'Admin', '${password1}', '{user, admin}', true, NOW(), NOW()),
        ('user@example.com', 'User', '${password2}', '{user}', true, NOW(), NOW())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" WHERE "email" IN ('admin@example.com', 'user@example.com')`,
    );
  }
}
