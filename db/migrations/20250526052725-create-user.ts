import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

export async function up(
  queryInterface: QueryInterface,
  sequelize: Sequelize,
): Promise<void> {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    discordId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING
    },
    banner: {
      type: DataTypes.STRING
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
  await queryInterface.dropTable('Users');
}