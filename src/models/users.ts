import { DataTypes, Model } from 'sequelize';
import sequelize from "../lib/database.ts";

class User extends Model {
  static associate(models: any) {
    this.hasMany(models.Guilds, { foreignKey: 'ownerId' });
  }
}

User.init(
  {
    discordId: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'User'
  }
);

export default User;