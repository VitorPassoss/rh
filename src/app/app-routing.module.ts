import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/main/main.component';
import { HomeComponent } from './pages/home/home/home.component';
import { MainInsumosComponent } from './pages/insumos/main-insumos/main-insumos.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'insumos', component: MainInsumosComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
