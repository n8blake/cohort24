import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolverService implements Resolve<unknown>{

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    console.log("getting user");
    console.log(route.params['id'])
    return this.usersService.getUser(route.params['id']);
  }

}
