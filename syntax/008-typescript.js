"use strict";
exports.__esModule = true;
var message = "hello world back";
console.log('message: ', message);
var isWork = false;
var isDone = null;
var isCode = undefined;
var someNumber = 20;
var someNumberCopyOne = null;
var someNumberCopyTwo = undefined;
var someString = "Hallelujah";
var someStringCopyOne = null;
var someStringCopyTwo = undefined;
var IdList = [1, 2, 3, 4];
var idList = [1, 2, 3, 4];
var NameList = ['you', 'me', 'he', 'she'];
var nameList = ['you', 'me', 'he', 'she'];
var otherList = [1, 'me', {}, undefined, [null]];
// Learn TypeScript-Tutorial in 50 Minutes - Tutorial for
var someTuple = [500, 'money'];
// code friendly
var someVariable = 123;
var multiType = 123;
var multiTypeCopy = '123';
function add(num1, num2, num3) {
    if (num2 === void 0) { num2 = 10; }
    if (num3)
        return num1 + num2 + num3;
    else
        return num1 + num2;
}
add(1, 2);
add(1, 2, 3);
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(' c: ', c); // 2
var position = 'UP';
var square = {};
square.color = 'blue';
square.sideLength = 10;
