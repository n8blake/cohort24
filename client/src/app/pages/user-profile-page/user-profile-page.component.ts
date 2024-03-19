import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  user?: IUser;
  canEdit: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user']
    if(!this.user){
      this.router.navigate(['/404']);
    }
    if(this.authService.currentUser){
      this.canEdit = this.authService.currentUser._id == this.user?._id;
    }
  }

}
