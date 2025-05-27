import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';  // To display login errors

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuthModule
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password)
        .then(() => {
          this.router.navigate(['/tabs/tab1']);
         })
        .catch((err: any) => {
          this.errorMessage = err.message;
        });
      }
  }
  onForgotPassword() {
    // Logic for forgotten password can be implemented here.
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  
}
