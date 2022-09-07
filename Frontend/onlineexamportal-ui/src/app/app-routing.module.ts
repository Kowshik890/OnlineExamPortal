import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminWelcomeComponent } from './components/admin/admin-welcome/admin-welcome.component';
import { HomeComponent } from './components/generic/home/home.component';
import { LoginComponent } from './components/generic/login/login.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { SignupComponent } from './components/generic/signup/signup.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin/admin.guard';
import { UserGuard } from './services/user/user.guard';
import { ViewCategoryComponent } from './components/admin/view-category/view-category.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard],
    children: [
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: '', component: AdminWelcomeComponent
      },
      {
        path: 'view-categories', component: ViewCategoryComponent
      },
      {
        path: 'add-category', component: AddCategoryComponent
      }
    ]
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
