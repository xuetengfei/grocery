const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv/config');

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  autoIndex: false,
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
mongoose.connection.on('error', console.error);

function close() {
  mongoose.connection.close();
}

// document
const docs = mongoose.connection.useDb('myDB');

const CatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// create a model
const Cat = docs.model('Cat', CatSchema);

// create a mongoDB object entity
const kitty = new Cat({ name: '豆豆', age: 1 });

// kitty.save(function (err, docs) {
//   if (err) console.log('err', err);
//   // saved!
//   console.log('docs', docs);
//   close();
// });

Cat.find(function (err, cats) {
  if (err) console.log('err', err);
  console.log('cats', cats);
  close();
});

// 请注意，在您的模型使用的连接打开之前，不会创建/删除任何储罐。
// 每个模型都有一个关联的连接。当您使用 mongoose.model() 时，您的模型将使用默认的猫鼬连接。
// If you create a custom connection, use that connection's model() function instead.
// const connection = mongoose.createConnection('mongodb://localhost:27017/test');
// const Tank = connection.model('Tank', yourSchema);
