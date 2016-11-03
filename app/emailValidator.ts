import { FormControl } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class EmailValidator {
  static invalidEmail(control: FormControl) {

    let pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?/;
    if ( pattern.test( control.value ) ) {
      return null;
    } else {
      return {'invalidEmail': true};
    };
  }
}
