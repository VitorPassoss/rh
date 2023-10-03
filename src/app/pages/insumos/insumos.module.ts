import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInsumosComponent } from './list-insumos/list-insumos.component';
import { MainInsumosComponent } from './main-insumos/main-insumos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ListTipoInsumoComponent } from './list-tipo-insumo/list-tipo-insumo.component';
import { ListStockInsumosComponent } from './list-stock-insumos/list-stock-insumos.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListInsumosComponent,
    MainInsumosComponent,
    FornecedoresComponent,
    ListTipoInsumoComponent,
    ListStockInsumosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ]
})
export class InsumosModule { }
