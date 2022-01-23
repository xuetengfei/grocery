const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const myDBName = mongoose.connection.useDb('myDB');
module.exports = myDBName.model('PostDB', PostSchema);

// https://stackoverflow.com/a/50818384

// const MyModel = mongoose.model('<ModelName>', mySchema);
// <ModelName> 会自动转换为小些的复数 PostDB ==》postdbs
// 第一个参数是模型所用集合的单数名称。猫鼬自动寻找复数，小写版本的您的模型名称。因此，对于上面的示例，模型 Tank 用于数据库中的坦克集合。
