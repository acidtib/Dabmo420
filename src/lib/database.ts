import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(Deno.env.get('DATABASE_URL') || "");

export default sequelize;