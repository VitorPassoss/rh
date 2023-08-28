import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducaoComponent } from './producao/producao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListProducaoComponent } from './list-producao/list-producao.component';



@NgModule({
  declarations: [
    ProducaoComponent,
    ListProducaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProducaoModule { }
