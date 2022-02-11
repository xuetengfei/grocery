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
    const record = await Note.findOne({
      //   description: 'update description',
      where: {
        id: [3],
      },
    });
    const data = JSON.stringify(record || [], null, 2);
    if (!data.length) {
      console.log('不存在');
    } else {
      record.description = 'Blizzard1';
      await record.save();
      console.log('record.description', record.description);
    }

    console.log('data', data); // 返回已删除的行数。
  } catch (error) {
    console.log('error', error);
  } finally {
    sequelize.close();
  }
}

main();
