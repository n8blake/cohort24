import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user-services/users.service';
@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {

  users?: IUser[]

  constructor(private usersService:UsersService, private authService:AuthService) {}

  ngOnInit(): void {
    this.getUsers();
    this.authService.user$.subscribe(_ => { 
      this.getUsers();
    })
    this.authService.logoutUser$.subscribe(logout => {
      if(logout){
        this.users = undefined;
      }
  })
  }

  getUsers(): void {
    if(this.authService.isAuthenticated()){
      this.usersService.getUsers().subscribe(users => {
        this.users = users;
      })
    }
  }

}
