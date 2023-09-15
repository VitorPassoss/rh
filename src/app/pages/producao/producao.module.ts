import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducaoComponent } from './producao/producao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListProducaoComponent } from './list-producao/list-producao.component';
import { TipoProdutosComponent } from './tipo-produtos/tipo-produtos.component';
import { ProdutosEstoqueComponent } from './produtos-estoque/produtos-estoque.component';



@NgModule({
  declarations: [
    ProducaoComponent,
    ListProducaoComponent,
    TipoProdutosComponent,
    ProdutosEstoqueComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProducaoModule { }
