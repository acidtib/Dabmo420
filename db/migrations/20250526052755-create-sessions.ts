import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up(
  queryInterface: QueryInterface,
  sequelize: Sequelize,
): Promise<void> {
  await queryInterface.createTable('Sessions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    discordGuildId: {
      type: DataTypes.STRING,
      references: {
        model: 'Guilds',
        key: 'discordId',
      },
    },
    discordUserId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'discordId',
      },
    },
    input: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
}

export async function down(
  queryInterface: QueryInterface,
  sequelize: Sequelize,
): Promise<void> {
  await queryInterface.dropTable('Sessions');
}