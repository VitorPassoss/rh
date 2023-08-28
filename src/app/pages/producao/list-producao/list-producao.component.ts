import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ProducaoService } from '../producao.service';

@Component({
  selector: 'app-list-producao',
  templateUrl: './list-producao.component.html',
  styleUrls: ['./list-producao.component.scss']
})
export class ListProducaoComponent implements OnInit {

  producao:any[]=[]

  constructor(
    public loadingService:LoadingService,
    public producaoService: ProducaoService
  ){}

  ngOnInit() {
    this.getProducao()
  }

  getProducao(){
    this.loadingService.present()
    this.producaoService.getProducao().subscribe(
      {
        next: async (res:any) => {
          console.log(res)
          this.producao = res
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
  
}
