import { Component, OnInit } from '@angular/core';
import { SaidasService } from '../saidas.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-saidas-list',
  templateUrl: './saidas-list.component.html',
  styleUrls: ['./saidas-list.component.scss']
})
export class SaidasListComponent implements OnInit {

  saidas:any[] = []

  constructor(
    public saidasService: SaidasService,
    public loadingService: LoadingService
  ){}

  ngOnInit(): void {
    this.getSaidas()
  }

  getSaidas(){
    this.loadingService.present()

    this.saidasService.getAllSaidas().subscribe({
      next: (res) => {
        this.saidas = res
        this.loadingService.dismiss()

      }
    })
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
  

}
