const Sequelize = require('sequelize');
const database = require('./database/connection');

/* 
使用build()和save()分两步或使用create()一步创建新行。
*/

let Note = database.define('notes', {
  description: Sequelize.STRING,
});

async function main() {
  try {
    // sqeuelize.syn()同步所有model,force选项丢弃的表，如果它的创建之前就存在。
    // await database.sync({ force: true });

    // 1 build +save
    // const note = Note.build({ description: 'Took a cold bath' });
    // await note.save();
    // console.log(note.get({ plain: true }));
    // 2 save
    const note = await Note.create({ description: 'xxx3' });
    console.log(note.get({ plain: true }));
  } catch (error) {
    console.log('failed to create notes', error);
  } finally {
    await database.close();
  }
}

main();
