import { Component, ViewChild } from '@angular/core';
import { SaidasListComponent } from '../saidas-list/saidas-list.component';
import { SaidasDestinacaoComponent } from '../saidas-destinacao/saidas-destinacao.component';

@Component({
  selector: 'app-saidas-home',
  templateUrl: './saidas-home.component.html',
  styleUrls: ['./saidas-home.component.scss']
})
export class SaidasHomeComponent {
  @ViewChild('stockInsumos') stockInsumos!: SaidasListComponent;
  @ViewChild('listInsumos') listInsumos!: SaidasDestinacaoComponent




  onTabChange(event:any) {
    if (event.index === 0) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.stockInsumos.ngOnInit();
    }
    if (event.index === 1) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.stockInsumos.ngOnInit();
    }
 
    
    
  }
}
