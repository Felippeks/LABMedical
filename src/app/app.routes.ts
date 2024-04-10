import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/login/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardRouter } from './guardsRoutes/guards.guard';
import { AppointmentRegistrationComponent } from './components/appointment-registration/appointment-registration.component';
import { ExamRegistrationComponent } from './components/exam-registration/exam-registration.component';
import { MedicalRecordListingComponent } from './components/medical-record-listing/medical-record-listing.component';
import { PatientMedicalListingComponent } from './components/patient-medical-listing/patient-medical-listing.component';
import { PatientRegistrationComponent } from './components/patient-registration/patient-registration.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardRouter] },
    { path: 'appointment', component: AppointmentRegistrationComponent, canActivate: [AuthGuardRouter] },
    { path: 'exam', component: ExamRegistrationComponent, canActivate: [AuthGuardRouter] },
    { path: 'medicalListing', component: MedicalRecordListingComponent, canActivate: [AuthGuardRouter] },
    { path: 'patientListing', component: PatientMedicalListingComponent, canActivate: [AuthGuardRouter]},
    {path : 'patientRegistration', component: PatientRegistrationComponent, canActivate: [AuthGuardRouter]}
];
