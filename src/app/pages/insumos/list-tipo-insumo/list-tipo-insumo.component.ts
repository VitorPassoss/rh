import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

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
  editing: any = null;

  constructor(
    public insumosService: InsumosService,
    public sharedService: SharedService,
    private formBuilder: FormBuilder,
    public loadingService: LoadingService

  ){
    this.insumoForm = this.formBuilder.group({
      nome: [null],
      grandeza: ['Kg']
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
  showEdit(item: any) {
    this.editing = item;
    this.insumoForm.patchValue(item); // popula o formulário
    this.visible = true;
  }

  async delete(id:number){
    this.loadingService.present()
    this.insumosService.deleteInsumo(id).subscribe(
      {
        next: async (res) => {
          this.loadingService.dismiss()
          this.sharedService.showToastSuccess('Insumo deletado com sucesso')
          this.getInsumos()
        },
        error: async (err) => {
          this.loadingService.dismiss()
          this.sharedService.showToastError('Erro ao deletar Insumo: '+ err)
        }
      }
    )
  
  
  }

  submitForm(){
    if(this.insumoForm.valid){
      const formData = this.insumoForm.value;

      if (this.editing) { 
        this.insumosService.updateInsumo(this.editing.id, formData).subscribe({
          next: async () => {
            this.getInsumos()
            this.sharedService.showToastSuccess("Item atualizado com sucesso");
            this.visible = false;
            this.editing = null;
            this.insumoForm.reset();
          },
          error: async () => {
            this.sharedService.showToastError("Ocorreu algum problema na atualização");
          }
        });
      } else { 
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

}