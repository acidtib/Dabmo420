import { DataTypes, Model } from 'sequelize';
import sequelize from "../lib/database.ts";

class Sessions extends Model {
  static associate(models: any) {
    this.belongsTo(models.Guilds, { foreignKey: 'discordGuildId' });
    this.belongsTo(models.Users, { foreignKey: 'discordUserId' });
  }
}

Sessions.init(
  {
    discordGuildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discordUserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Sessions'
  }
);

export default Sessions;