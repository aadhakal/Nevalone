// signup.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { addnewUser, getCurrentUser } from 'src/API';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
   
  }

  onSignup() {
    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
  
    this.authService.registerUser({ email, password }).then(
      (userCredential) => {
        // Get the UID of the newly registered user
        const uid = userCredential.user?.uid;
  
        if (uid) {
          // Pass UID to addnewUser function
          addnewUser(uid, email, password, name);
          this.router.navigateByUrl('/tabs/tab1');
        } else {
          this.errorMessage = "Couldn't get UID of the registered user.";
        }
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
} 
