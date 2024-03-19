import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserRouteActivatorService } from './services/user-route-activator.service';
import { UserProfileResolverService } from './services/user-profile-resolver.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "users", component: UsersListPageComponent },
  { path: "user/:id", 
    component: UserProfilePageComponent, 
    canActivate: [UserRouteActivatorService], 
    resolve: {user: UserProfileResolverService}},
  { path: "404", component: NotFoundPageComponent, pathMatch: 'full'},
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
