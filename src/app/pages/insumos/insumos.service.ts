import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jsPDF } from "jspdf";

import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  constructor(
    private http: HttpClient
  ) { }


  getEntradas() {
      return this.http.get<any>(`${environment.urlApi}/entrada/`)
  }

  getInsumos() {
    return this.http.get<any>(`${environment.urlApi}/entrada/insumos`)
  }

  getFornecedores() {
    return this.http.get<any>(`${environment.urlApi}/entrada/fornecedores`)
  }

  getEstoque(){
    return this.http.get<any>(`${environment.urlApi}/entrada/estoque`)
  }

  createEntrada(data:any) {
    return this.http.post<any>(`${environment.urlApi}/entrada/`, data)
  }

  createFornecedor(data:any) {
    return this.http.post<any>(`${environment.urlApi}/entrada/fornecedores`, data)
  }

  createTipo(data:any){
    return this.http.post<any>(`${environment.urlApi}/entrada/insumos`, data)
  }


  generatePDF(detailProduct:any){
 
    const insumos = detailProduct.items

    let dataEmissao = detailProduct.data

    let pdf = new jsPDF({
      //orientation: 'portrait', 
      unit: 'px', 
      hotfixes: ["px_scaling"]});

    let chunks = [];
    for (let i = 0; i < insumos.length; i += 20) {
        chunks.push(insumos.slice(i, i + 20));
    }
    let globalIndex = 0;  // Inicia a variável global do índice

    
    // PROPERTIES
    let title = `Relatorio de entradas do mes/ano : ${dataEmissao}`
    pdf.setProperties({
      title: title,
      author: 'Laticinio uirapuru'
    });
    chunks.forEach((chunk, chunkIndex) => {
      if (chunkIndex > 0) {
        pdf.addPage();
      }

        // Adicionando a imagem
    pdf.addImage("assets/143647803_1837917296355950_4199470375859877961_n.jpg", "JPG", 40, 40, 170, 170);
  

      autoTable(pdf, {
          body: [
              [{ content: 'LATICINIO UIRAPURU LTDA', styles: { fontSize: 9, halign: 'center', minCellHeight: 20 } }],
          ],
          startY: 60,
          theme: 'grid',
          margin: { right: 20, left: 285 },
      });

      // Título e Endereço
      autoTable(pdf, {
          body: [
              [{ content: 'RELATORIO DE ENTRADAS MENSAL', styles: { fontSize: 9, halign: 'center', minCellHeight: 20 } }],
          ],
          foot: [
              [{ content: 'AREA RODOVIA BR 174, S/N KM25', styles: { fontSize: 9, halign: 'center', minCellHeight: 20 } }],
              [{ content: 'MANAUS/AM - CEP: 69055-090', styles: { fontSize: 6, halign: 'center',  minCellHeight: 20, cellPadding: { left: 35 }, fillColor: [255,255,255] } }],
          ],
          startY: 90,
          theme: 'grid',
          margin: { right: 20, left: 285 },
      });


      autoTable(pdf, {
        head: [
          [ 
            {content: 'Data', styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 0, top: 1, left:1, bottom:0}, fillColor: [255,255,255], halign: 'center',}},
            {content: 'Origem/Fornecedor', styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 0, top: 1, left:0, bottom:0}, fillColor: [255,255,255], halign: 'center',}},
            {content: 'Nome Material', styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 0, top: 1, left:0, bottom:0}, fillColor: [255,255,255], halign: 'center',}},
            {content: 'Quantidade', styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 0, top: 1, left:0, bottom:0}, fillColor: [255,255,255], halign: 'center',}},
            {content: 'Valor', styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:0, bottom:0}, fillColor: [255,255,255], halign: 'center',}},
          ],
        ],
        body: chunk.map((insumo:any) => {
          let data = new Date(insumo.created_at).toLocaleDateString('pt-BR', {timeZone: "America/Sao_Paulo"})
    
          globalIndex++;
          return [
            {
              content: data, 
              styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:1, bottom:1}, fillColor: [255,255,255], halign: 'center',}
            },
            {
              content: insumo.fornecedor.nome , 
              styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:1, bottom:1}, fillColor: [255,255,255], halign: 'center',}
            },
            {
              content: insumo.tipo_insumo.nome , 
              styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:1, bottom:1}, fillColor: [255,255,255], halign: 'center',}
            },
            {
              content: insumo.quantidade + '/' + insumo.tipo_insumo.grandeza, 
              styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:1, bottom:1}, fillColor: [255,255,255], halign: 'center',}
            },
            {
              content: Number(insumo.valor ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 
              styles: {fontSize: 7, fontStyle: 'normal', textColor: [0,0,0], lineColor: 1, lineWidth:{right: 1, top: 1, left:1, bottom:1}, fillColor: [255,255,255], halign: 'center',}
            },
          
          ]
  
        } ),
        startY: 256, //+25
        theme: 'grid',
        margin: {right: 20, top: 0, left:20, bottom:0},
      })

     
  
   
    
    })

      


      
    let pdfBlob = pdf.output('blob');
    let url = URL.createObjectURL(pdfBlob);

    window.open(url)

    
    pdf.html(document.body, {
      callback: function (pdf:any) {
      },
      x: 1000,
      y: 10
    });
  }
 


}
