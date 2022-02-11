const Sequelize = require('sequelize');
require('dotenv/config');

/* 
Sequelize 模型定义
该示例创建一个简单的模型。 它将模型保存到数据库表中。

创建了一个新模型Dummy。 第一个参数是型号名称。 第二个参数由属性组成，这些属性是表列。 在我们的例子中，我们有一个列名description，它是String类型。
sync()方法将模型同步到数据库。 实际上，它将创建一个新的dummies表。 （表名是复数的。）

➜  plain-sequelize git:(master) ✗ node "/Users/gaze/gaze/code/006-grocery/express/plain-sequelize/2_define_model.js"
Executing (default): CREATE TABLE IF NOT EXISTS `dummies` (`id` INTEGER NOT NULL auto_increment , `description` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `dummies`
New table created
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

let Dummy = sequelize.define('dummy', {
  description: Sequelize.STRING,
});

Dummy.sync({ force: true })
  .then(() => {
    console.log('New table created');
  })
  .finally(() => {
    sequelize.close();
  });
