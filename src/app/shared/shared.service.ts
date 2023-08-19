import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private messageService: MessageService
  ) { }



  showToastSuccess(msg: string) {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Sucesso', detail: msg });
  }

  showToastError(msg: string) {
    this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: msg });
  }
}
