import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/user-services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

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

  getObjectProperties(obj: Object): { key: string; value: any }[] {
    return Object.entries(obj).map(([key, value]) => ({
      key,
      value,
    }));
  }



}
