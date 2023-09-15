import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { HomeComponent } from './pages/home/home/home.component';
import { MainInsumosComponent } from './pages/insumos/main-insumos/main-insumos.component';
import { ProducaoComponent } from './pages/producao/producao/producao.component';
import { SaidasHomeComponent } from './pages/saidas/saidas-home/saidas-home.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const routes: Routes = [
  { 
    path: '', canActivate: [JwtAuthGuard], component: MainComponent, children: [
      {path: '', component: HomeComponent, },
      {path: 'insumos', component: MainInsumosComponent},
      {path: 'producao', component: ProducaoComponent},
      {path: 'saidas', component: SaidasHomeComponent}
    ] 
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
