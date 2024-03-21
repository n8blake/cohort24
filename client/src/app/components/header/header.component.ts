import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: IUser;
  authServiceUser?: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthenticationStatus().subscribe();
    this.authService.user$.subscribe(user => { 
      this.user = user;
    })
    this.authService.logoutUser$.subscribe(logout => {
      if(logout){
        this.user = undefined;
      }
    })
  }

}
