import { Component, OnInit } from '@angular/core';
import { InsumosService } from '../../insumos/insumos.service';
import { ProducaoService } from '../../producao/producao.service';
import { SaidasService } from '../../saidas/saidas.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
 constructor(
    public insumoService:InsumosService,
    public producaoService: ProducaoService,
    public saidasService: SaidasService
 ){}


  basicData: any;

  basicOptions: any;

  quantidadeEntradas:any = 0
  quantidadeProducao:any = 0
  quantidadeProdutos:any = 0
  quantidadeSaidas:any = 0
  data: any;
  options: any;

  ngOnInit() {
    forkJoin([
        this.insumoService.getEntradas(),
        this.producaoService.getProducao(),
        this.producaoService.getProdutos(),
        this.saidasService.getAllSaidas()
    ]).subscribe(results => {
        this.quantidadeEntradas = results[0].length;
        this.quantidadeProducao = results[1].length;
        this.quantidadeProdutos = results[2].length;
        this.quantidadeSaidas = results[3].length;
        this.constructorGraph();
    });
}


 getEntradas(){
     this.insumoService.getEntradas().subscribe({
        next: (res) => {
            console.log(res.length)
             this.quantidadeEntradas =  res.length
        }
    })
  }

getProducao(){
    this.producaoService.getProducao().subscribe({
        next: (res)=>{
            this.quantidadeProducao = res.length
        }
    })
  }

getProdutos(){
    this.producaoService.getProdutos().subscribe({
        next: (res)=>{
            this.quantidadeProdutos =res.length
        }
    })
  }

getSaidas(){
    this.saidasService.getAllSaidas().subscribe({
        next: (res)=>{
            this.quantidadeSaidas = res.length
        }
    })
  }


constructorGraph(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
        labels: ['Entradas', 'Producao', 'Produtos', 'Saidas'],
        datasets: [
            {
                label: ['Quantidade Total'],
                data: [this.quantidadeEntradas, this.quantidadeProducao, this.quantidadeProdutos, this.quantidadeSaidas],
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}




}
