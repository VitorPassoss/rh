import { Component, ViewChild } from '@angular/core';
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
    if (event.index === 0) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.stockInsumos.ngOnInit();
    }
    if (event.index === 1) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.stockInsumos.ngOnInit();
    }
    if (event.index === 2) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.tipoInsumos.ngOnInit();
    }
    if (event.index === 3) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.fornecedores.ngOnInit();
    }
    
    
  }
}
