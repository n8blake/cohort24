import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserRouteActivatorService } from './services/user-services/user-route-activator.service';
import { UserProfileResolverService } from './services/user-services/user-profile-resolver.service';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AssignmentsPageComponent } from './pages/assignments-page/assignments-page.component';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { AssignmentPageComponent } from './pages/assignment-page/assignment-page.component';
import { CourseRouteActivatorService } from './services/course-services/course-route-activator.service';
import { CourseResolverService } from './services/course-services/course-resolver.service';
import { AssignmentRouteActivatorService } from './services/assignment-services/assignment-route-activator.service';
import { AssignmentResolverService } from './services/assignment-services/assignment-resolver.service';

const routes: Routes = [
  { path: "assignments", component: AssignmentsPageComponent },
  { path: "courses", component: CoursesPageComponent },
  { path: "courses/:id", 
    component: CoursePageComponent,
    canActivate: [CourseRouteActivatorService],
    resolve: {course: CourseResolverService}
  },
  { path: "courses/:courseId/assignments/:assignmentId", 
    component: AssignmentPageComponent,
    canActivate: [AssignmentRouteActivatorService],
    resolve: {assignment: AssignmentResolverService}
  },
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
