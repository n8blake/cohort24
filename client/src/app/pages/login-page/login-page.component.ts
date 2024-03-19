import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  mouseoverLogin = false;
  loginInvalid = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    
  }

  login(): void {
    console.log(this.email.value);
    console.log(this.password.value);
    this.authService
      .loginUser(this.email.value, this.password.value)
      .subscribe((response) => {
        console.log(response);
        if (!response) {
          this.loginInvalid = true;
        } else if(response._id) {
          this.authService.getCurrentIdentity().subscribe(identity => {
            if(response._id == identity._id){
              this.router.navigate(['/user', response._id]);
            } else {
              console.log("error when navigating");
              console.log(response);
              console.log(identity);
            }
          });
        }
      });
  }

}
