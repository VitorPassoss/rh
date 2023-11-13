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
      this.listProducao.ngOnInit();
      this.produtoEstoque.ngOnInit();
      this.tipoInsumos.ngOnInit();
    }


    onChange(event: any) {
      this.listProducao.ngOnInit();
      this.produtoEstoque.ngOnInit();
      this.tipoInsumos.ngOnInit();
    }
  

}
