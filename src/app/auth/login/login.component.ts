import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    pass: ['', [Validators.required]],
    remember: [localStorage.getItem('remember') || false],
  });
  public auth2: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.loginUser(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
          localStorage.setItem(
            'remember',
            this.loginForm.get('remember').value
          );
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  noValidInput(input: string): boolean {
    return this.loginForm.get(input).invalid && this.formSubmitted;
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });

    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      googleUser => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogleUser(id_token).subscribe(resp => this.ngZone.run(() => this.router.navigateByUrl('/')));
      }, error => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
}
