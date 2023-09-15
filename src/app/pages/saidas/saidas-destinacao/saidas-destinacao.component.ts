import { Component, OnInit } from '@angular/core';
import { ProducaoService } from '../../producao/producao.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-saidas-destinacao',
  templateUrl: './saidas-destinacao.component.html',
  styleUrls: ['./saidas-destinacao.component.scss']
})
export class SaidasDestinacaoComponent implements OnInit {

  visible:boolean = false

  destinacoes: any[] = []
  formData = {
    nome:''
  }


  constructor(
    public producaoService:ProducaoService,
    public loadingService: LoadingService
  ){

  }

  ngOnInit() {
    this.getDestinos()
  }


  getDestinos(){
    this.producaoService.destinacoes().subscribe(
      {
        next: (res) => {
          this.destinacoes = res
        }
      }
    )
  }


  saveDestino(){
    this.loadingService.present()
    this.producaoService.SaveDestinacoes(this.formData).subscribe(
      {
        next: (res) => {
          this.loadingService.dismiss()
          this.getDestinos()
          this.visible = false
        }
      }
    )
  }


  openAdd(){
    this.visible = true
  }


}
