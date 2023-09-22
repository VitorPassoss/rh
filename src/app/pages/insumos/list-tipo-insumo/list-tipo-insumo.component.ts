import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';

@Component({
  selector: 'app-list-tipo-insumo',
  templateUrl: './list-tipo-insumo.component.html',
  styleUrls: ['./list-tipo-insumo.component.scss']
})
export class ListTipoInsumoComponent implements OnInit {
  visible: boolean = false;
  insumos: any[] = []
  insumoForm: FormGroup
  grandezas:any[] = []
  constructor(
    public insumosService: InsumosService,
    public sharedService: SharedService,
    private formBuilder: FormBuilder,

  ){
    this.insumoForm = this.formBuilder.group({
      nome: [null],
      grandeza: [null]
    })
   
  }

  showAddTipo() {
      this.visible = true;
  }

  ngOnInit() {
    this.getInsumos()
    this.grandezas = [
      'Kg' ,
      'L' ,
      'Un' 
    ]    
  }

  async getInsumos(){
    this.insumosService.getInsumos().subscribe(
      {
        next: async(res) => {
          console.log(res)
          this.insumos = res
        },
        error: async(e) =>{
          this.sharedService.showToastError("Falha ao carregar insumos")
        }
      }
    )

  }

  submitForm(){
    if(this.insumoForm.valid){
      const formData = this.insumoForm.value;
      
      this.insumosService.createTipo(formData).subscribe({
        next: async () => {
          this.sharedService.showToastSuccess("Tipo insumo criado com sucesso");
          this.visible = false;
          this.insumoForm.reset();
          this.getInsumos()
        },
        error: async () => {
          this.sharedService.showToastError("Ocorreu algum problema ao carregar os tipos de insumos");
        }
      })
    }
  }

}