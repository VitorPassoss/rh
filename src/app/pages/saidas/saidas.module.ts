import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaidasHomeComponent } from './saidas-home/saidas-home.component';
import { SaidasListComponent } from './saidas-list/saidas-list.component';
import { SaidasDestinacaoComponent } from './saidas-destinacao/saidas-destinacao.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SaidasHomeComponent,
    SaidasListComponent,
    SaidasDestinacaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SaidasModule { }
