const Sequelize = require('sequelize');
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

let notes = [
  { description: 'Tai chi in the morning' },
  { description: 'Visited friend' },
  { description: 'Went to cinema' },
  { description: 'Listened to music' },
  { description: 'Watched TV all day' },
  { description: 'Walked for a hour' },
];

// sqeuelize.syn()同步所有model,force选项丢弃的表，如果它的创建之前就存在。
sequelize.sync({ force: true }).then(() => {
  Note.bulkCreate(notes, { validate: true })
    .then(() => {
      console.log('notes created');
    })
    .catch(err => {
      console.log('failed to create notes', err);
    })
    .finally(() => {
      sequelize.close();
    });
});
