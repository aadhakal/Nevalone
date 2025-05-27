import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

   
    // Returns the authentication state of the user.
    getAuthStatus(): Observable<firebase.User | null> {
      return this.afAuth.authState;
    }

    login(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    logout() {
      this.afAuth.signOut().then(() => {
          this.router.navigate(['/login']);
      }).catch(error => {
          console.error("Error signing out: ", error);
      });
  }
  

    registerUser(value: { email: string, password: string }) {
      return new Promise<any>((resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
          .then(
            res => resolve(res),
            err => reject(err)
          );
      });
    }
    
    
  }

