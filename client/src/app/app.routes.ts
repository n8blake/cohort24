import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "users", component: UsersListPageComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
