// tsc 008-typescript.ts --watch
export {};
let message = `hello world back`;
console.log('message: ', message);

let isWork: boolean = false;
let isDone: boolean = null;
let isCode: boolean = undefined;

let someNumber: number = 20;
let someNumberCopyOne: number = null;
let someNumberCopyTwo: number = undefined;
let someString: string = `Hallelujah`;
let someStringCopyOne: string = null;
let someStringCopyTwo: string = undefined;

let IdList: number[] = [1, 2, 3, 4];
let idList: Array<number> = [1, 2, 3, 4];

let NameList: string[] = ['you', 'me', 'he', 'she'];
let nameList: Array<string> = ['you', 'me', 'he', 'she'];

let otherList: any[] = [1, 'me', {}, undefined, [null]];

// Learn TypeScript-Tutorial in 50 Minutes - Tutorial for

let someTuple: [number, string] = [500, 'money'];

// code friendly

let someVariable: any = 123;

let multiType: number | string = 123;
let multiTypeCopy: number | string = '123';

function add(num1: number, num2: number = 10, num3?: number) {
  if (num3) return num1 + num2 + num3;
  else return num1 + num2;
}

add(1, 2);
add(1, 2, 3);

enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
console.log(' c: ', c); // 2

type Position = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const position: Position = 'UP';

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = 'blue';
square.sideLength = 10;
