const Sequelize = require('sequelize');
const { Op } = Sequelize;
require('dotenv/config');

const sequelize = new Sequelize(
  process.env.database,
  process.env.username,
  process.env.password,
  {
    dialect: 'mysql',
    host: process.env.host,
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
    define: {
      // 关闭时间戳记 createdAt updatedAt
      timestamps: false,
    },
  },
);

let Note = sequelize.define('notes', {
  description: Sequelize.STRING,
});

async function main() {
  try {
    const record = await Note.findAll({
      where: {
        id: [1, 4],
        // id: {
        //   [Op.in]: [1, 4],
        // },
      },
      attributes: { exclude: ['id'] },
    });
    const data = JSON.stringify(record || [], null, 2);
    console.log('data', data);
  } catch (error) {
    console.log('error', error);
  } finally {
    sequelize.close();
  }
}

main();
