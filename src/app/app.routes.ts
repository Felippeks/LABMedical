import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardRouter } from './guardsRoutes/guards.guard';
import { AppointmentRegistrationComponent } from './components/appointment-registration/appointment-registration.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';
import { authChildGuard } from './guardsRoutes/auth-child-guard.guard';
import { PatientMedicalListingComponent } from './components/medical-listing/patient-listing/patient-listing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardRouter] },
  {
    path: 'appointments',
    canActivate: [AuthGuardRouter],
    children: [
      { path: '', component: AppointmentRegistrationComponent },
      { path: ':id', component: AppointmentRegistrationComponent },
    ],
  },
  {
    path: 'exam',
    canActivate: [AuthGuardRouter],
    children: [
      { path: '', component: ExamRegistrationComponent },
      { path: ':id', component: ExamRegistrationComponent },
    ],
  },
  {
    path: 'patientListing',
    loadChildren: () =>
      import('./components/medical-listing/medical-listing.module').then(
        (m) => m.medicalListingModule,
      ),
    canActivateChild: [authChildGuard],
  },
  {
    path: 'patientListing/:id',
    component: PatientMedicalListingComponent,
    canActivate: [AuthGuardRouter],
  },
  {
    path: 'medicalListing',
    loadChildren: () =>
      import('./components/medical-listing/medical-listing.module').then(
        (m) => m.medicalListingModule,
      ),
    canActivateChild: [authChildGuard],
  },
  {
    path: 'patientRegistration',
    canActivate: [AuthGuardRouter],
    children: [
      { path: '', component: PatientRegistrationComponent },
      { path: ':id', component: PatientRegistrationComponent },
    ],
  },
];
