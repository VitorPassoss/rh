import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaidasService {

  constructor(
    private http: HttpClient
  ) { }



  getAllSaidas(){
    return this.http.get<any>(`${environment.urlApi}/saidas/`)
  }

  deleteDestinacao(id:number){
    return this.http.delete<any>(`${environment.urlApi}/saidas/destinacao/${id}`)
  }

  updateDestinacao(id:number, data:any){
    return this.http.put<any>(`${environment.urlApi}/saidas/destinacao/${id}`, data)
  }


}
