import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ProducaoService } from '../producao.service';
import { InsumosService } from '../../insumos/insumos.service';

@Component({
  selector: 'app-produtos-estoque',
  templateUrl: './produtos-estoque.component.html',
  styleUrls: ['./produtos-estoque.component.scss']
})
export class ProdutosEstoqueComponent implements OnInit{

  productsStock:any[] = []
  quitModal:boolean = false
  destinacoesList: any[] = []
  destinySelect:any 

  productSelect:any = {}


  saida = {
    quantidade:0,
    destinacao:'',
    ref:'',
    id_ref:0,
  }

  ngOnInit(): void {
    this.getProdutoEstoque()
    this.getDestinacoes()
  }

  constructor(
    public loadingService:LoadingService,
    public sharedService: SharedService,
    public producaoService: ProducaoService,
    public insumosService: InsumosService

  ){
  }

  getProdutoEstoque(){
    this.loadingService.present()
    this.producaoService.produtosEstoque().subscribe({
      next: (res) => {
        this.productsStock = res
        this.loadingService.dismiss()
      }
    })
  }

  async getDestinacoes(){
    this.producaoService.destinacoes().subscribe({
      next: async (res:any) => {
        this.destinacoesList = res
      }
    })
  }

  Saida(product:any){
    this.quitModal = true
    this.productSelect = product
  }

  confirmSaida(){
    this.loadingService.present()

    this.saida.ref = 'produto'
    this.saida.id_ref = this.productSelect.produto.id

    this.producaoService.registroSaida(this.saida).subscribe({
      next: (res) => {
        this.loadingService.dismiss()
        this.getProdutoEstoque()
        this.quitModal = false
      }
    })
  }


  generatePDF (){

    let mainObject:any = this.productsStock
    const currentDate = new Date(); // Obter a data atual
  
  
    const payload = {
      items : mainObject,
      data : currentDate
    }
  
    this.insumosService.generatePdfProduct(payload)
    
  }
  


}
