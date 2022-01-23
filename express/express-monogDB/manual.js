const mongoose = require('mongoose');
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

const db = mongoose.connection.useDb('myDB');

const { Schema } = mongoose;

const TankSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Tank = db.model('Tank', TankSchema);
// entity document
const small = new Tank({ title: 'small' });

function close() {
  mongoose.connection.close();
}
small.save(function (err, small) {
  if (err) console.log('err', err);
  // saved!
  console.log('small', small);
  close();
});

return;
// or
Tank.create({ size: 'small' }, function (err, small) {
  if (err) console.log('err', err);
  console.log('small', small);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function (err) {});

// 请注意，在您的模型使用的连接打开之前，不会创建/删除任何储罐。
// 每个模型都有一个关联的连接。当您使用 mongoose.model() 时，您的模型将使用默认的猫鼬连接。
// If you create a custom connection, use that connection's model() function instead.
// const connection = mongoose.createConnection('mongodb://localhost:27017/test');
// const Tank = connection.model('Tank', yourSchema);
