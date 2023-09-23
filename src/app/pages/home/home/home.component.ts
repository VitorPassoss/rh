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
    public insumoService: InsumosService,
    public producaoService: ProducaoService,
    public saidasService: SaidasService
){}

basicData: any;
basicOptions: any;
quantidadeEntradas: any = 0;
quantidadeProducao: any = 0;
quantidadeProdutos: any = 0;
quantidadeSaidas: any = 0;
entradas: any;
data: any;
options: any;
producao: any = [];
totalLeiteProcessado: number = 0;
quantidadeProduzida: number = 0;
quantidadeGasto: number = 0;
quantidadeGastoDisplay: any = 0;

async ngOnInit() {
    this.getProducao();
    this.getEntradas();
    forkJoin([
        this.insumoService.getEntradas(),
        this.producaoService.getProducao(),
        this.producaoService.getProdutos(),
        this.saidasService.getAllSaidas(),
    ]).subscribe(async (results) => {
        this.quantidadeEntradas = results[0].length;
        this.quantidadeProducao = results[1].length;
        this.quantidadeProdutos = results[2].length;
        this.quantidadeSaidas = results[3].length;
        this.constructorGraph();
        this.infoPanel();
    });
}

getCurrentMonthDates(): { start: string, end: string } {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return {
        start: startOfMonth.toISOString(),
        end: endOfMonth.toISOString()
    };
}

async infoPanel(){
    this.producao.forEach((item: any) => {
        item.produtos.forEach((product: any) => {
            this.totalLeiteProcessado += Number(product.leite_processado);
            this.quantidadeProduzida += Number(product.quantidade);
        });
    });

    this.entradas.forEach((item: any) => {
        this.quantidadeGasto += parseFloat(item.valor);
    });

    this.quantidadeGastoDisplay = this.quantidadeGasto.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

async getEntradas(){
    const { start, end } = this.getCurrentMonthDates();
    this.insumoService.getEntradas().subscribe({
        next: (res) => {
            const filteredEntries = res.filter((entry:any) => entry.created_at >= start && entry.created_at <= end);
            this.quantidadeEntradas = filteredEntries.length;
            this.entradas = filteredEntries;
        }
    });
}

async getProducao(){
    const { start, end } = this.getCurrentMonthDates();
    this.producaoService.getProducao().subscribe({
        next: (res) => {
            const filteredProducao = res.filter((prod:any) => prod.created_at >= start && prod.created_at <= end);
            this.producao = filteredProducao;
            this.quantidadeProducao = filteredProducao.length;
        }
    });
}

async getProdutos(){
    const { start, end } = this.getCurrentMonthDates();
    this.producaoService.getProdutos().subscribe({
        next: (res) => {
            const filteredProdutos = res.filter((prod:any) => prod.created_at >= start && prod.created_at <= end);
            this.quantidadeProdutos = filteredProdutos.length;
        }
    });
}

async getSaidas(){
    const { start, end } = this.getCurrentMonthDates();
    this.saidasService.getAllSaidas().subscribe({
        next: (res) => {
            const filteredSaidas = res.filter((saida:any) => saida.created_at >= start && saida.created_at <= end);
            this.quantidadeSaidas = filteredSaidas.length;
        }
    });
}

async constructorGraph(){
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
