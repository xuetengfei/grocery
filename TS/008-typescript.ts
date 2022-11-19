// tsc 008-typescript.ts --watch
export {};

function identity(arg: number): number {
  return arg;
}

identity(1);
identity('2');

function identity2(arg: any): any {
  return arg;
}

identity2(1);
identity2(null);
identity2('any');

function identity3<T>(arg: T): T {
  // console.log(arg.length);
  if (typeof arg === 'number') {
  }
  if (typeof arg === 'string') {
    return arg.length;
  }
  return arg;
}

identity3(1);
identity3('xyz');
identity3(null);

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
  p: Position;
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

{
  // 巧用 keyof
  const data = {
    a: 3,
    hello: 'world',
  };

  function getValue1(o: any, name: string) {
    return o[name];
  }
  function getValue2<T extends object, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
  }

  // getValue2(data, 'x');
}

{
  // 接口智能提示
  interface Seal {
    name: string;
    url: string;
  }
  interface API {
    '/user': { name: string; age: number; phone: string };
    '/seals': { seal: Seal[] };
  }
  const api = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
    return fetch(url).then(res => res.json());
  };
  // api('/seals').then(res=>res.)
}

interface User {
  name: string;
  age: number;
  occupation: string;
  type?: string;
}
interface Admin {
  name: string;
  age: number;
  role: string;
}
export type Person = User | Admin;
export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

// const isAdmin: (person: Admin) => Boolean = person => person.type === 'admin';
// const isUser: (person: Admin) => Boolean = person => person.type === 'admin';

export function logPerson(person: Person) {
  let additionalInformation: string;
  if ('role' in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
persons.forEach(logPerson);

// 一种方法是使用类型断言，显示的告诉 TypeScript，person 就是 Admin 类型或者就是 User 类型，但是这样做一方面不够优雅，要在每一处都加上断言；
// 另一方面滥用断言也会让我们的代码变得不可控，不能让 TypeScript 帮助我们进行合理的类型推断。像双重断言可以规避掉 TypeScript 的类型检查机制也是与 any 一样，要尽可能去避免的。

// 常用的高级类型

type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Required<T> = {
  [P in keyof T]-?: T[P];
};
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Exclude<T, U> = T extends U ? never : T;
// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
interface User {
  id: number;
  age: number;
  name: string;
}
// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>;
// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, 'id' | 'age'>;
// 相当于: type OmitUser = { age: number; name: string; }
type OmitUser = Omit<User, 'id'>;

type AnimalType = 'cat' | 'dog' | 'frog';
interface AnimalDescription {
  name: string;
  icon: string;
}
const AnimalMap: Record<AnimalType, AnimalDescription> = {
  cat: { name: '猫', icon: ' ' },
  dog: { name: '狗', icon: ' ' },
  forg: { name: '蛙', icon: ' ' }, // Hey!
};

declare global {
  type Maybe<T> = T | undefined | null;
  type MaybeNumber = Maybe<number>;
  type MaybeNumber1 = number | undefined | null;
}

let goalMaybeNumber: MaybeNumber1;
goalMaybeNumber = 1;
goalMaybeNumber = 'asdsad';

const toArray = <T>(element: T) => [element]; // Error in .tsx file.
const toArray1 = <T extends {}>(element: T) => [element]; // No errors.
