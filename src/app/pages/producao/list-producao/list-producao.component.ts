import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ProducaoService } from '../producao.service';
import { InsumosService } from '../../insumos/insumos.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-list-producao',
  templateUrl: './list-producao.component.html',
  styleUrls: ['./list-producao.component.scss']
})
export class ListProducaoComponent implements OnInit {

  producao:any[] = []
  Estoque:any[] = []
  EstoqueItem:any[] = []
  visible:boolean = false
  productItems:any = []

  targetItems:any = []
  selectedItems: any[] = [];


  dataInsumo:any = []
  dataProduto:any = []

  optionsEstoque:any = []
  distroProduct:boolean = false
  productionSelect:any = {}


  quitModal:boolean = false
  destinacoesList: any[] = []
  destinySelect:any 

  producaoFiltrada: any[] = this.producao;
  active :boolean = false


  constructor(
    public loadingService:LoadingService,
    public producaoService: ProducaoService,
    public insumosService: InsumosService,
    public sharedService: SharedService,
    private cdr: ChangeDetectorRef,

  ){}

  ngOnInit() {
    this.getProducao()
    this.getProdutos()
    this.getEstoque()
    this.producaoFiltrada = [...this.producao];
  }

onItemMovedToTarget(event: any) {
  event.items.forEach((item: any) => {
    item.isSelected = true;
    this.selectedItems.push(item);
  });
}

filtrarPorMesEAno(dataInput: string): void {
  this.active = true

  const [yearInput, monthInput] = dataInput.split('-').map(Number); // Convertendo as partes para números

  this.producaoFiltrada = this.producao.filter(item => {
    const dataItem = new Date(item.created_at);

    const monthItem = dataItem.getMonth() + 1; // Os meses em JavaScript são base 0, por isso adicionamos 1.
    const yearItem = dataItem.getFullYear();

    return monthItem === monthInput && yearItem === yearInput;
  });
}


limparFiltro(): void {
  this.active = false
  this.producaoFiltrada = [...this.producao];
}


onItemMovedToSource(event: any) {
  event.items.forEach((item: any) => {
    item.isSelected = false;
    item.leite_processado
    item.produto = item.id
    const index = this.selectedItems.indexOf(item);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    }
  });
}

getProducao(){
  this.loadingService.present()
  this.producaoService.getProducao().subscribe(
    {
      next: async (res:any) => {
        this.producao = res
        this.producaoFiltrada = [...this.producao];
        this.loadingService.dismiss()
      }
    }
  )
}

formatToBrasiliaTimezone(dateStr: string): string {
  const date = new Date(dateStr);

  const offset = date.getTimezoneOffset() + 4 * 60; 
  date.setTime(date.getTime() - offset * 60 * 1000);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

  getTotalLeiteProcessado(produtos: any[]) {
    let total = 0;
    produtos.forEach(produto => {
        total += parseFloat(produto.leite_processado);
    });
    return total;
}

async getProdutos(){
  this.producaoService.getProdutos().subscribe(
    {
      next: async (res:any) => {
        this.productItems = res
      },
      error: async (err:any) => {
        this.sharedService.showToastError("Falha ao carregar produtos")
      }
    }
  )

}

async getEstoque(){
  this.insumosService.getEstoque().subscribe(
    {
      next: async (res:any) => {
        this.Estoque = res
              
      },
      error: async (err:any) => {
        this.sharedService.showToastError("Falha ao carregar registros")
      }
    }
  )
}


  
updateItem() {
  this.cdr.markForCheck();
  console.log(this.EstoqueItem)
}

closeDialog(){
  this.EstoqueItem = []
}


startProcess(){

  this.Estoque.forEach((item:any)=>{
    if(item.tipo_insumo.nome == "Leite" ){
        this.EstoqueItem.push(item)
    }
  })
  this.EstoqueItem.forEach((item)=>{
    item.quantidade_estoque = item.quantidade  
  })
  
  this.visible = true;
 
}

submitProcess(){
  this.loadingService.present()

  this.EstoqueItem.forEach((item:any)=>{
    if(item.tipo_insumo.nome  = 'Leite'){
      let total_milk = 0
      this.selectedItems.map(producst => {
        total_milk += producst.leite_processado
      })
      item.quantidade = total_milk
    }
})


  const payload = {
    status: "EA",
    insumos: this.EstoqueItem.map(item => ({
          quantidade: item.quantidade,
          tipo_insumo: item.tipo_insumo.id,
          valor: item.valor  // ou qualquer outro campo relevante
      })),
    produtos: this.selectedItems.map(item => ({
          produto: item.id, 
          leite_processado: item.leite_processado,
          quantidade: item.quantidade
        }))
  }

  this.producaoService.startProducao(payload).subscribe(
    {
      next: async (res) => {
        this.loadingService.dismiss()
        this.sharedService.showToastSuccess("Registro criado com sucesso");
        this.selectedItems = []
        this.EstoqueItem = []
        this.visible = false
        this.getEstoque()
        this.getProducao()
      },
      error: async (err) => {
        this.sharedService.showToastError("Ocorreu algum problema no registro");
      }
    }
  )

}

distroProducts(item:any){
  this.distroProduct = true
  this.productionSelect = item
}

finishProcess(production:any){
  this.loadingService.present()
  console.log(production)
  const payload = {
    producao_items: production.produtos
  }

  this.producaoService.finishProduction(production.id, payload).subscribe({
    next: async () => {
      this.loadingService.dismiss()
      this.sharedService.showToastSuccess("Registro criado com sucesso");
      this.getProducao()
    }
  })

}







}
