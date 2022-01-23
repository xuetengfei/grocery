const { divider, log } = require('./utils');

/*
Array-like objects
https://2ality.com/2013/05/quirk-array-like-objects.html
JavaScript quirks
Array-like objects
has: indexed access to elements and the property length that tells us how many elements the object has.
does not have: array methods such as push, forEach and indexOf.
Two examples of array - like objects is
document.getElementsByClassName()
special variable arguments
*/

/* arguments */

{
  function printArgs() {
    log('Length: ' + arguments.length);
    log(arguments.length);
    const l = Array.from(arguments);
    l.forEach((v, idx) => console.log(idx + ' -> ' + v));
    divider();
  }

  printArgs();
  printArgs('a');
  printArgs('a', 'b');
}

// https://betterprogramming.pub/10-modern-javascript-tricks-every-developer-should-use-377857311d79
// 1. Conditionally Add Properties to Object
{
  const condition = true;
  const person = {
    id: 1,
    name: 'John Doe',
    ...(condition && { age: 16 }),
  };
}

// 2. Check if a Property Exists in an Object

{
  const person = { name: 'John Doe', salary: 1000 };
  console.log('salary' in person); // returns true
  console.log('age' in person); // returns false
}

// 3. Dynamic Property Names in Objects

{
  const dynamic = 'flavour';
  var item = {
    name: 'Biscuit',
    [dynamic]: 'Chocolate',
  };
  console.log(item); // { name: 'Biscuit', flavour: 'Chocolate' }

  const keyName = 'name';
  console.log(item[keyName]); // returns 'Biscuit'
}

// 4. Object Destructuring With a Dynamic Key
{
  const person = { id: 1, name: 'John Doe' };
  const { name: personName } = person;
  console.log(personName); // returns 'John Doe'
}

{
  const templates = {
    hello: 'Hello there',
    bye: 'Good bye',
  };
  const templateName = 'bye';
  const { [templateName]: template } = templates;
  console.log(template); // returns 'Good bye'
}

// 5. Nullish Coalescing, ?? Operator

{
  const foo = null ?? 'Hello';
  console.log(foo); // returns 'Hello'
  const bar = 'Not null' ?? 'Hello';
  console.log(bar); // returns 'Not null'
  const baz = 0 ?? 'Hello';
  console.log(baz); // returns 0

  const cannotBeZero = 0 || 5;
  console.log(cannotBeZero); // returns 5
  const canBeZero = 0 ?? 5;
  console.log(canBeZero); // returns 0
}

// 6. Optional chaining (?.)

{
  const book = { id: 1, title: 'Title', author: null };
  // normally, you would do this
  console.log(book.author.age); // throws error
  console.log(book.author && book.author.age); // returns null (no error)
  // with optional chaining
  console.log(book.author?.age); // returns undefined
  // or deep optional chaining
  console.log(book.author?.address?.city); // returns undefined

  const person = {
    firstName: 'Haseeb',
    lastName: 'Anwar',
    printName: function () {
      return `${this.firstName} ${this.lastName}`;
    },
  };
  console.log(person.printName()); // returns 'Haseeb Anwar'
  console.log(persone.doesNotExist?.()); // returns undefined
}

// 7. Boolean Conversion Using the !! Operator

{
  const greeting = 'Hello there!';
  console.log(!!greeting); // returns true
  const noGreeting = '';
  console.log(!!noGreeting); // returns false
}

// 8. String and Integer Conversions

{
  const stringNumer = '123';
  console.log(+stringNumer); // returns integer 123
  console.log(typeof +stringNumer); // returns 'number'

  const myString = 25 + '';
  console.log(myString); // returns '25'
  console.log(typeof myString); // returns 'string'
}

// 9. Check Falsy Values in an Array

{
  const myArray = [null, false, 'Hello', undefined, 0];
  // filter falsy values
  const filtered = myArray.filter(Boolean);
  console.log(filtered); // returns ['Hello']
  // check if at least one value is truthy
  const anyTruthy = myArray.some(Boolean);
  console.log(anyTruthy); // returns true
  // check if all values are truthy
  const allTruthy = myArray.every(Boolean);
  console.log(allTruthy); // returns false

  myArray.filter(val => Boolean(val));
  myArray.filter(Boolean);
}

// 10. Flattening Arrays of Arrays
{
  const myArray = [{ id: 1 }, [{ id: 2 }], [{ id: 3 }]];
  const flattedArray = myArray.flat();
  // returns [ { id: 1 }, { id: 2 }, { id: 3 } ]

  const arr = [0, 1, 2, [[[3, 4]]]];
  console.log(arr.flat(2)); // returns [0, 1, 2, [3,4]]
}
