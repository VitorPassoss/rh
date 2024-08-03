import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { StaffComponent } from './pages/staff/staff.component';
import { StaffDetailComponent } from './pages/staff/staff-detail/staff-detail.component';
import { StaffRegisterComponent } from './pages/staff/staff-register/staff-register.component';

const routes: Routes = [
  { 
    path: '', component: MainComponent, children: [
      {path: 'staff', component: StaffComponent },
      {path: 'staff/details/:id', component: StaffDetailComponent },

    ] 
  },
  {path: 'login', component: LoginComponent},
  {path: 'create', component: StaffRegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
