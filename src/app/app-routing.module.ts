import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { HomeComponent } from './pages/home/home/home.component';
import { MainInsumosComponent } from './pages/insumos/main-insumos/main-insumos.component';
import { ProducaoComponent } from './pages/producao/producao/producao.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'insumos', component: MainInsumosComponent},
      {path: 'producao', component: ProducaoComponent}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
