const { MongoClient } = require('mongodb');
require('dotenv/config');

const client = new MongoClient(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(err => {
  if (err) throw err;
  const col = client.db('test');
  var myobj = { weather: 'sun', data: '1970-01-01' };
  col.collection('weather_table').insertOne(myobj, function (err, res) {
    if (err) throw err;
    console.log('res', res);
    console.log('文档插入成功');
    client.close();
  });
});

// for (let index = 0; index < 100; index++) {
//     db.inventory.insertOne({
//         item:Math.random()*200
//     })
// }
