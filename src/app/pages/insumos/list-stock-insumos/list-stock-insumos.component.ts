import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';

@Component({
  selector: 'app-list-stock-insumos',
  templateUrl: './list-stock-insumos.component.html',
  styleUrls: ['./list-stock-insumos.component.scss']
})
export class ListStockInsumosComponent implements OnInit {
  Estoque:any = []
  EstoqueItem: any[] = [];
  visible: boolean = false;


  constructor(
    public insumosService: InsumosService,
    public sharedService: SharedService,

  ){
    
  }

  ngOnInit() {
    this.getEstoque()
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



  onSelectionChange(event: any) {
    console.log(event)
    console.log(this.EstoqueItem)
  }

  showAddInsumo() {
    this.visible = true;
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
