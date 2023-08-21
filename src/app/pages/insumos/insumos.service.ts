import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

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

 


}
