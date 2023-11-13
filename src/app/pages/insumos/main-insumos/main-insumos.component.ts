import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FornecedoresComponent } from '../fornecedores/fornecedores.component';
import { ListInsumosComponent } from '../list-insumos/list-insumos.component';
import { ListStockInsumosComponent } from '../list-stock-insumos/list-stock-insumos.component';
import { ListTipoInsumoComponent } from '../list-tipo-insumo/list-tipo-insumo.component';

@Component({
  selector: 'app-main-insumos',
  templateUrl: './main-insumos.component.html',
  styleUrls: ['./main-insumos.component.scss']
})
export class MainInsumosComponent {

 
  @ViewChild('stockInsumos') stockInsumos!: ListStockInsumosComponent;
  @ViewChild('listInsumos') listInsumos!: ListInsumosComponent
  @ViewChild('tipoInsumos') tipoInsumos!: ListTipoInsumoComponent;
  @ViewChild('fornecedores') fornecedores!: FornecedoresComponent;



  onTabChange(event:any) {
    if (event.index === 0) { 
      this.stockInsumos.ngOnInit();
    }
    if (event.index === 1) { 
      this.stockInsumos.ngOnInit();
    }
    if (event.index === 2) { 
      this.tipoInsumos.ngOnInit();
    }
    if (event.index === 3) { 
      this.fornecedores.ngOnInit();
    }
    
    
  }
}
