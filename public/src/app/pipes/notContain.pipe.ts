import {Pipe} from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'notContain'
})
export class NotContainPipe {

  transform(value, args?) {
    // ES6 array destructuring
    let [exception] = args;
    return value.filter(type => {
      return type.title != exception;
    });
  }

}