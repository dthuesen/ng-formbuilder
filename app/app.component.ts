import { Component } from '@angular/core';
import { FormControl,
         FormGroup,
         FormBuilder,
         Validators } from '@angular/forms';
import { EmailValidator } from './emailValidator';


@Component({
    selector: 'my-app',
    template: `
      <div class="container">
        <h1>Register</h1>
        <form [formGroup]="form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" [formControl]="form.controls['username']" >
            <div *ngIf="form.controls['username'].dirty && !form.controls['username'].pending && !form.controls['username'].valid"> 
              <div *ngIf="!form.controls['username'].required" class="alert alert-danger">Username required</div>
              <div *ngIf="!form.controls['username'].minLength" class="alert alert-danger">Minimum lengt: 3 characters</div>
            </div> 
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" [formControl]="form.controls['email']" >
            <div *ngIf="form.controls['email'].dirty && !form.controls['email'].pending && !form.controls['email'].valid"> 
              <div *ngIf="!form.controls['email'].required" class="alert alert-danger">Email required</div>
              <div *ngIf="!form.controls['email'].invalidEmail" class="alert alert-danger">Email format is invalid</div>
            </div> 
          </div>
          <button type="submit" [disabled]="!form.valid" class="btn btn-default">Submit</button>
        </form>
      </div>
    `,
})
export class AppComponent {

  form: FormGroup;
  username: FormControl;
  email: FormControl;

  constructor( builder: FormBuilder) {

    this.form = builder.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, EmailValidator.invalidEmail])]
    });
  }
}
