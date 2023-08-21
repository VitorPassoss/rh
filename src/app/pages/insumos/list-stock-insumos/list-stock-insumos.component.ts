import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';
import { ProducaoService } from '../../producao/producao.service'
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(
    public insumosService: InsumosService,
    public sharedService: SharedService,
    public producaoService: ProducaoService,
    private cdr: ChangeDetectorRef
  ){
  }

  ngOnInit() {
    this.getEstoque()
    this.cdr.markForCheck();
    this.getProdutos()

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
          console.log(res)
          this.Estoque = res
          
        },
        error: async (err:any) => {
          console.log(err)
          this.sharedService.showToastError("Falha ao carregar registros")
        }
      }
    )
  }

  async getProdutos(){
    this.producaoService.getProdutos().subscribe(
      {
        next: async (res:any) => {
          console.log(res)
          this.productItems = res
        },
        error: async (err:any) => {
          console.log(err)
          this.sharedService.showToastError("Falha ao carregar produtos")
        }
      }
    )

  }




  onSelectionChange(event: any) {
    
  }


  startProcess(){
    this.EstoqueItem.forEach((item)=>{
      item.quantidade_estoque = item.quantidade
    })
    this.visible = true;
   console.log(this.EstoqueItem)
  }


  submitProcess(){
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
            quantidade: item.quantidade  // ou qualquer outro campo relevante
        }))
    }

    this.producaoService.startProducao(payload).subscribe(
      {
        next: async (res) => {
          console.log(res)
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




}
