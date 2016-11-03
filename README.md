# Formbuilder Example with validation built with Angular 2 Quickstart template


## Some usefull snippets from the code

The form in this example (built with FormBuilder) is reactive form

### 1. The AppModule `app.module.ts`
##### Import:
```bash
 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

##### The NgModule imports array:
```bash
  imports:      [ ..., FormsModule, ReactiveFormsModule ],
```


### 2. The import statements in the component
I'm not sure if all these imports (`FormControl`, `FormGroup`, `FormBuilder`, `Validators` and `Validators`) are necessary. I built this example along tutorial on udemy. But this tutorial worked with a beta release of Angular 2 and just before my self study came the 2.0.0 out. There were braking changes and I had to figure out what works with the the form builder. In the video tutorial they used `Control`, `ControlGroup`, `FormBuilder`, `Validators`, `FORM_DIRECTIVES`, `ngControl` and `[ngFormModel]`.
```bash
  import { Component } from '@angular/core';
  import { FormControl,
           FormGroup,
           FormBuilder,
           Validators } from '@angular/forms';
  import { EmailValidator } from './emailValidator';
```

#### The form it self

##### In the template: 

Use the FormGroup from `@angular/forms`
```bash
<form [formGroup]="form">
```


##### and in the class:
first a varibale for the form
```bash
form: FormGroup;
```
and then in the constructor
```bash
  this.form = builder.group({
    ...
  });
```

#### The form fields

##### In the template:
With FormControl form `@angular/forms`
```bash
  <input type="text" class="form-control" [formControl]="form.controls['username']" >
```
##### and in the class:
The variables for the form fields
```bash
  username: FormControl;
  email: FormControl;
```
And in the constructor for the validation
```bash
  this.form = builder.group({
    'username': [the validation parameters],
    'email': [the validation parameters]
  });
```
#### The Validation for the form fields

##### In the template:
```bash
  <div *ngIf="form.controls['username'].dirty && !form.controls['username'].pending && !form.controls['username'].valid"> 
    <div *ngIf="!form.controls['username'].required" class="alert alert-danger">Username required</div>
    <div *ngIf="!form.controls['username'].minLength" class="alert alert-danger">Minimum lengt: 3 characters</div>
  </div>
```

##### ...in the class:
```bash
  this.form = builder.group({
    'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    'email': [null, Validators.compose([Validators.required, EmailValidator.invalidEmail])]
  });
              ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^  ^   
                                         the validation
                                         
```

##### ...in the helper class `emailValidator.ts` (file):
Note the regex pattern. There are thousand's different version around, but this works well. 
```bash
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

```

