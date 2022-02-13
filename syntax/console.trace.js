function app() {
  function doSomething() {
    var a = 1;
    var b = 2;
    sumFunction(a, b);
  }

  function sumFunction(a, b) {
    console.trace('Our First Trace');
    return a + b;
  }

  doSomething();
}

app();
