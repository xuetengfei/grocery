const Sequelize = require('sequelize');
require('dotenv/config');

/* 
创建与 MySQL 数据库的连接。
authenticate()方法通过尝试向数据库进行认证来测试连接。 
建立连接后，我们将打印一条消息。
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
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })
  .finally(() => {
    sequelize.close();
    console.log('Connection established closed.');
  });
