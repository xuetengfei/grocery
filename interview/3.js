var currentScope = 0; // global scope
(function () {
  var currentScope = 1,
    one = 'scope1';
  console.log(currentScope);
  (function () {
    var currentScope = 2,
      two = 'scope2';
    console.log(currentScope);
    (function () {
      var currentScope = 3,
        three = 'scope3';
      console.log(currentScope);
      console.log(one + two + three);
    })();
  })();
})();
