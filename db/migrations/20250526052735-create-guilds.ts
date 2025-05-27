import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up(
  queryInterface: QueryInterface,
  sequelize: Sequelize,
): Promise<void> {
  await queryInterface.createTable('Guilds', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    discordId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING
    },
    ownerId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'discordId',
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    memberCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
  await queryInterface.dropTable('Guilds');
}