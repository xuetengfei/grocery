const { divider, log } = require('./utils');
// [JavaScript quirk 8: array-like objects](https://2ality.com/2013/05/quirk-array-like-objects.html)
// [12 JavaScript quirks](https://2ality.com/2013/04/12quirks.html)

// Array-like objects

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

function printArgs() {
  Array.prototype.forEach.call(arguments, function (arg, i) {
    console.log(i + '. ' + arg);
  });
}
printArgs();

printArgs('a');
