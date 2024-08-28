import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateExperianceComponent } from './components/candidate/candidate-experiance/candidate-experiance.component';
import { CandidateSkillsComponent } from './components/candidate/candidate-skills/candidate-skills.component';
import { RegisterCandidateComponent } from './components/candidate/register-candidate/register-candidate.component';
import { EmployerJobsComponent } from './components/employer/employer-jobs/employer-jobs.component';
import { RegisterEmployerComponent } from './components/employer/register-employer/register-employer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registercandidate', component: RegisterCandidateComponent },
  { path: 'registeremployer', component: RegisterEmployerComponent },
  { path: 'candidateskills', component: CandidateSkillsComponent },
  { path: 'candidateexperiance', component: CandidateExperianceComponent },
  { path: 'employerjobs', component: EmployerJobsComponent },
  
    // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
 

export const AppRoutingModule = RouterModule.forRoot(routes);