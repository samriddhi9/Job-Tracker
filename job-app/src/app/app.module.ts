import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JobDataComponent } from './job-data/job-data.component';
import { JobsService } from './job.service';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule, Routes ,Router  } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './authentication/authService';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    JobDataComponent,
    CreateComponent,
    EditComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule ,FormsModule ,HttpClientModule, RouterModule, AppRoutingModule
  ],
  providers: [JobsService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
