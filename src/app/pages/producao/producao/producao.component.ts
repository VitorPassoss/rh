import { Component, ViewChild } from '@angular/core';
import { ListProducaoComponent } from '../list-producao/list-producao.component';
import { ProdutosEstoqueComponent } from '../produtos-estoque/produtos-estoque.component';
import { TipoProdutosComponent } from '../tipo-produtos/tipo-produtos.component';

@Component({
  selector: 'app-producao',
  templateUrl: './producao.component.html',
  styleUrls: ['./producao.component.scss']
})
export class ProducaoComponent {


  @ViewChild('listProducao') listProducao!: ListProducaoComponent;
  @ViewChild('produtoEstoque') produtoEstoque!: ProdutosEstoqueComponent
  @ViewChild('tipoInsumos') tipoInsumos!: TipoProdutosComponent;



  onTabChange(event:any) {
    if (event.index === 0) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.listProducao.ngOnInit();
    }
    if (event.index === 1) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.produtoEstoque.ngOnInit();
    }
    if (event.index === 2) { // Isso é um exemplo para a segunda aba. Ajuste o índice conforme necessário.
      this.tipoInsumos.ngOnInit();
    }

    
  }

}
