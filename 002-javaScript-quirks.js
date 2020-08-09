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
