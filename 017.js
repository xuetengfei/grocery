const { divider, log } = require('./utils');

{
  const game = Object.freeze({
    name: 'Warcraft',
  });

  game.developer = 'Blizzard';
  //TypeError: Cannot add property developer, object is not extensible
  console.log('game', game);
  console.log(Object.isFrozen(game));
  //true
}
divider();
{
  const game = {
    name: 'Warcraft',
    developer: 'Blizzard',
  };
  const keys = Object.keys(game);
  console.log(keys);
  // ["name", "developer"]
  Object.keys(game).forEach(key => console.log(key));
}
divider();

{
  const game = {
    name: 'Overwatch',
    developer: {
      name: 'Blizzard',
    },
  };
  Object.freeze(game);
  game.developer.name = 'Activision Blizzard';
  console.log(game);
  //{
  // developer: {name: "Activision Blizzard"},
  //  name: "Overwatch"
  //}

  function deepFreeze(object) {
    Object.entries(object).forEach(([name, value]) => {
      if (value && typeof value === 'object') {
        deepFreeze(value);
      }
    });
    return Object.freeze(object);
  }
  deepFreeze(game);
  game.developer.name = 'Activision Blizzard';
  //Cannot assign to read only property 'name' of object
}
divider();
{
  const game = {
    name: 'Warcraft',
    developer: 'Blizzard',
  };
  const map = new Map(Object.entries(game));
  console.log(map);
  //Map(2) {"name" => "Warcraft", "developer" => "Blizzard"}
}
// divider();
log('Object.fromEntries');
{
  const keyValuePairs = [
    ['name', 'Warcraft'],
    ['developer', 'Blizzard'],
  ];
  const game = Object.fromEntries(keyValuePairs);
  console.log(game);
  //{name: "Warcraft", developer: "Blizzard"}
}
log('Object.create');
{
  const gamePrototype = {
    toString: function () {
      return `${this.name}, developed by ${this.developer}`;
    },
  };

  const game = Object.create(gamePrototype);
  game.name = 'Overwatch';
  game.developer = 'Blizzard';
  console.log(game.toString());
  //'Overwatch, developed by Blizzard'
}

{
  const obj = {};
  Object.getPrototypeOf(obj) === Object.prototype;
  //true
}
{
  const gameMethods = {
    toString: function () {
      return `${this.name}, developed by ${this.developer}`;
    },
  };
  const game = {
    name: 'Diablo',
    developer: 'Blizzard',
  };
  Object.assign(game, gameMethods);
  console.log(game.toString());
  //'Diablo, developed by Blizzard'
  const anotherGame = Object.assign({}, game, gameMethods);
  console.log(anotherGame.toString());
  //'Diablo, developed by Blizzard'
}

{
  const game = {
    name: 'Fornite',
    developer: 'Epic Games',
  };
  const hasRight = false;
  const propName = 'name';
  Object.defineProperty(game, propName, {
    get: function () {
      if (hasRight) {
        return game[propName];
      } else {
        throw `${propName} no access`;
      }
    },
  });
  console.log(game.name);
  //name no access
}
/**
 * 
 * Key Notes
We have at our disposal utilities for freezing and 
then detecting frozen objects. (Object.freeze / Object.isFrozen)
Other utilities help us extract all the owned properties
 of an object in a new array giving us access to the powerful array methods. 
 (Object.keys / Object.values / Object.entries)
We can create a new object inheriting from an existing prototype and then 
use another utility function to check the prototype of a given object. 
(Object.create/Object.getPrototypeOf)
Transforming objects into an array of [key, value] pairs and then back 
into objects becomes straightforward using the Object.entries and Object.
fromEntries helpers. That makes it easy to convert between maps and objects.
Object.assign() helps us cloning objects or copying properties of several 
objects into a new one.
Object.defineProperty utility modifies an existing property or defines a
 new one. It is mainly used to change the property descriptors.
*/
