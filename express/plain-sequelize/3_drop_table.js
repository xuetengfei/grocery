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

let Dummy = sequelize.define('dummy', {
  description: Sequelize.STRING,
});

Dummy.drop()
  .then(() => {
    console.log('dummy table droped');
  })
  .finally(() => {
    sequelize.close();
  });
