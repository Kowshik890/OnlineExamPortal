import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NavbarComponent } from './components/generic/navbar/navbar.component';
import { FooterComponent } from './components/generic/footer/footer.component';
import { SignupComponent } from './components/generic/signup/signup.component';
import { LoginComponent } from './components/generic/login/login.component';
import { HomeComponent } from './components/generic/home/home.component';
import { authInterceptorProvider } from './services/generic/auth.interceptor';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminWelcomeComponent } from './components/admin/admin-welcome/admin-welcome.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { ViewCategoryComponent } from './components/admin/view-category/view-category.component';
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';
import { ViewQuizComponent } from './components/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuizQuestionComponent } from './components/admin/add-quiz-question/add-quiz-question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    AdminWelcomeComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    UpdateCategoryComponent,
    ViewQuizComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuizQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
