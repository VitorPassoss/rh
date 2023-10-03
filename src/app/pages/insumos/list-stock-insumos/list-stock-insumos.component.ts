import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';
import { ProducaoService } from '../../producao/producao.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-list-stock-insumos',
  templateUrl: './list-stock-insumos.component.html',
  styleUrls: ['./list-stock-insumos.component.scss']
})
export class ListStockInsumosComponent implements OnInit {
  Estoque:any = []
  EstoqueItem: any[] = [];
  visible: boolean = false;

  productItems:any = []

  targetItems:any = []
  selectedItems: any[] = [];


  dataInsumo:any = []
  dataProduto:any = []

  optionsEstoque:any = []

  constructor(
    public insumosService: InsumosService,
    public sharedService: SharedService,
    public producaoService: ProducaoService,
    private cdr: ChangeDetectorRef,
    public loadingService:LoadingService

  ){
  }

  ngOnInit() {
    this.getEstoque()
    this.cdr.markForCheck();
    this.getProdutos()
    this.EstoqueItem = []
  }



onItemMovedToTarget(event: any) {
  event.items.forEach((item: any) => {
    item.isSelected = true;
    this.selectedItems.push(item);
  });
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

  
  async getEstoque(){
    this.insumosService.getEstoque().subscribe(
      {
        next: async (res:any) => {
          this.Estoque = res
          this.Estoque.forEach((item:any)=>{
            item.quantidade_estoque = item.quantidade  
          })
          
          
                    
        },
        error: async (err:any) => {
          this.sharedService.showToastError("Falha ao carregar registros")
        }
      }
    )
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



  updateItem() {
    this.cdr.markForCheck();
    console.log(this.EstoqueItem)
  }






  startProcess(){

    this.Estoque.forEach((item:any)=>{
      if(item.tipo_insumo.nome == "Leite" ){
          this.EstoqueItem.push(item)
      }
    })
   
    this.visible = true;
   
  }


  closeDialog(){
    this.EstoqueItem = []
  }

  submitProcess(){
    if(this.selectedItems.length == 0 || this.EstoqueItem.length == 0){
      return  this.sharedService.showToastError("Selecione pelo menos um produto e um insumo");
    }

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
            valor: item.valor 
        })),
      produtos: this.selectedItems.map(item => ({
            produto: item.id, 
            leite_processado: item.leite_processado,
            quantidade: item.quantidade
          }))
    }

    return this.producaoService.startProducao(payload).subscribe(
      {
        next: async (res) => {
          this.loadingService.dismiss()
          this.sharedService.showToastSuccess("Registro criado com sucesso");
          this.selectedItems = []
          this.EstoqueItem = []
          this.visible = false
          this.getEstoque()
          
        },
        error: async (err) => {
          this.sharedService.showToastError("Ocorreu algum problema no registro");
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



generatePDF (){

  let mainObject:any = this.Estoque
  const currentDate = new Date(); // Obter a data atual


  const payload = {
    items : mainObject,
    data : currentDate
  }

  this.insumosService.generatePdfStock(payload)
  
}





}
