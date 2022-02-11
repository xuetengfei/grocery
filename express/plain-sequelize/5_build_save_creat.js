const Sequelize = require('sequelize');
require('dotenv/config');

/* 
使用build()和save()分两步或使用create()一步创建新行。
*/

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
    // sqeuelize.syn()同步所有model,force选项丢弃的表，如果它的创建之前就存在。
    // await sequelize.sync({ force: true });

    // 1 build +save
    // const note = Note.build({ description: 'Took a cold bath' });
    // await note.save();

    // 2 save
    await Note.create({ description: 'xxx' });
  } catch (error) {
    console.log('failed to create notes', error);
  } finally {
    await sequelize.close();
  }
}

main();
