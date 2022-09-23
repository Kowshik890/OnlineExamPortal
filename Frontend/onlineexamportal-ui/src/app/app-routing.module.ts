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
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';
import { ViewQuizComponent } from './components/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuizQuestionComponent } from './components/admin/add-quiz-question/add-quiz-question.component';
import { UpdateQuizQuestionComponent } from './components/admin/update-quiz-question/update-quiz-question.component';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { UserWelcomeComponent } from './components/user/user-welcome/user-welcome.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';

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
      },
      {
        path: 'update-category', component: UpdateCategoryComponent
      },
      {
        path: 'view-quizzes', component: ViewQuizComponent
      },
      {
        path: 'add-quiz', component: AddQuizComponent
      },
      {
        path: 'update-quiz', component: UpdateQuizComponent
      },
      {
        path: 'view-quiz-questions/:id/:title', component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-quiz-question/:id/:title', component: AddQuizQuestionComponent
      },
      {
        path: 'update-quiz-question/:id', component: UpdateQuizQuestionComponent
      }
    ]
  },
  {
    path: 'user', component: UserDashboardComponent, canActivate: [UserGuard],
    children: [
      {
        path: '', component: UserWelcomeComponent
      },
      {
        path: ':id', component: LoadQuizComponent
      },
      {
        path: 'instructions/:id', component: InstructionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
