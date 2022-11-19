#!/usr/local/bin/ts-node

// [TypeScript: Documentation - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators)

function first() {
  console.log('first(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('first(): called');
    console.log('first(): called~target', target);
    console.log('first(): called~propertyKey', propertyKey);
    console.log('first(): called~descriptor', descriptor);
    console.log('first(): called~descriptor~value', descriptor.value);
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log('second(): called');
  };
}

class C {
  @first()
  @second()
  method(): void {
    console.log('c~metod');
  }
}

new C().method();
