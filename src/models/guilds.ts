import { DataTypes, Model } from 'sequelize';
import sequelize from "../lib/database.ts";

class Guild extends Model {
  static associate(models: any) {
    // Define associations here
  }
}

Guild.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discordId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    sequelize,
    modelName: 'Guild'
  }
);

export default Guild;