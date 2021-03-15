import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  public registerForm = this.fb.group({
    name: ['Jero', [Validators.required, Validators.minLength(2)]],
    email: ['jero@email.com', [Validators.required, Validators.email]],
    pass: ['jero15nimo', [Validators.required]],
    pass2: ['jero15nimo', [Validators.required]],
    terms: [true, [Validators.required]]
  }, {
    validators: this.equalPass('pass', 'pass2')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.postUser(this.registerForm.value).subscribe(
      resp => this.router.navigateByUrl('/'),
      err => Swal.fire('Error', err.error.msg, 'error')
    );
  }

  noValidInput(input: string): boolean {
    return this.registerForm.get(input).invalid && this.formSubmitted;
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  invalidPass(): boolean {
    const pass = this.registerForm.get('pass').value;
    const pass2 = this.registerForm.get('pass2').value;

    return pass !== pass2 && this.formSubmitted;
  }

  equalPass(pass: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.get(pass);
      const pass2Control = formGroup.get(pass2);

      if (passControl.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({notEqual: true});
      }
    };
  }
}
