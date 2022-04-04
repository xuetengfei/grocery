{
  var tmp = new Date();
  function f() {
    console.log(tmp);
    if (false) {
      var tmp = 'hello';
    }
  }
  f(); // undefined
}
