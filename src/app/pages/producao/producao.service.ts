import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {

  constructor(
    private http: HttpClient
  ) { }

  getProdutos() {
    return this.http.get<any>(`${environment.urlApi}/producao/produtos`)
  }

  startProducao(data:any){
    return this.http.post<any>(`${environment.urlApi}/producao/`, data)
  }

  getProducao(){
    return this.http.get<any>(`${environment.urlApi}/producao/`)
  }

  createTypeProduct(data:any){
    return this.http.post<any>(`${environment.urlApi}/producao/produtos`, data)
  }

  finishProduction(id:any, data:any){
    return this.http.put<any>(`${environment.urlApi}/producao/${id}`, data)
  }

  produtosEstoque(){
    return this.http.get<any>(`${environment.urlApi}/producao/estoque`)
  }

  destinacoes(){
    return this.http.get<any>(`${environment.urlApi}/saidas/destinacao`)
  }

  SaveDestinacoes(data:any){
    return this.http.post<any>(`${environment.urlApi}/saidas/destinacao`, data)
  }

  registroSaida(data:any){
    return this.http.post<any>(`${environment.urlApi}/saidas/`, data)
  }

}
