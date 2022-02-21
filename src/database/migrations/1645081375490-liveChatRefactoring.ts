import {MigrationInterface, QueryRunner} from "typeorm";

export class liveChatRefactoring1645081375490 implements MigrationInterface {
    name = 'liveChatRefactoring1645081375490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`block\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`last_message_id\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`mute\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`last_message_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`mute\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`block\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`user_id\`, \`conversation_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`conversation_id\` \`conversation_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`user_id\`, \`id\`, \`conversation_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`IDX_2b97367ea8ccd8e415681f8b0d\` ON \`user_conversation\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_b312a0529c18723a53f7e90cd9\` ON \`user_conversation\` (\`conversation_id\`)`);
        await queryRunner.query(`ALTER TABLE \`information\` ADD CONSTRAINT \`FK_562e04265642e67cc09f4d8b2d0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`profiles\` ADD CONSTRAINT \`FK_9e432b7df0d182f8d292902d1a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD CONSTRAINT \`FK_2b97367ea8ccd8e415681f8b0d7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD CONSTRAINT \`FK_b312a0529c18723a53f7e90cd9d\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_830a3c1d92614d1495418c46736\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`messages\` ADD CONSTRAINT \`FK_3bc55a7c3f9ed54b520bb5cfe23\` FOREIGN KEY (\`conversation_id\`) REFERENCES \`conversations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_3bc55a7c3f9ed54b520bb5cfe23\``);
        await queryRunner.query(`ALTER TABLE \`messages\` DROP FOREIGN KEY \`FK_830a3c1d92614d1495418c46736\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP FOREIGN KEY \`FK_b312a0529c18723a53f7e90cd9d\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP FOREIGN KEY \`FK_2b97367ea8ccd8e415681f8b0d7\``);
        await queryRunner.query(`ALTER TABLE \`profiles\` DROP FOREIGN KEY \`FK_9e432b7df0d182f8d292902d1a2\``);
        await queryRunner.query(`ALTER TABLE \`information\` DROP FOREIGN KEY \`FK_562e04265642e67cc09f4d8b2d0\``);
        await queryRunner.query(`DROP INDEX \`IDX_b312a0529c18723a53f7e90cd9\` ON \`user_conversation\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b97367ea8ccd8e415681f8b0d\` ON \`user_conversation\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`conversation_id\` \`conversation_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`block\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`mute\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`last_message_id\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD PRIMARY KEY (\`conversation_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`mute\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`last_message_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_conversation\` ADD \`block\` tinyint NOT NULL DEFAULT '0'`);
    }

}
