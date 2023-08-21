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

}
