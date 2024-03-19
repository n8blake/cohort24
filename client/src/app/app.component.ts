import { Component, OnInit } from '@angular/core';
import { IUser } from './models/user.interface';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'UMD Smith Cohor 24';
  user?: IUser;

  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.authService.getCurrentIdentity().subscribe(user => {
      this.user = user;
    })
    this.authService.user$.subscribe(user => this.user = user);
    this.authService.logoutUser$.subscribe(logout => {
      if(logout) this.user = undefined;
    })
  }

}
