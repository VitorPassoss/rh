import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { InsumosService } from '../insumos.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: any[] = []
  fornecedorForm: FormGroup
  visible: boolean = false;

  constructor(
    public insumosService: InsumosService,
    private formBuilder: FormBuilder,
    public sharedService: SharedService

  ){
    this.fornecedorForm = this.formBuilder.group({
      nome: [null],
      cpf_cnpj: [null],
      razao_social: [null]
    })
  }

  ngOnInit() {
    this.getFornecedores()
  }

  async getFornecedores(){
    this.insumosService.getFornecedores().subscribe(
      {
        next: async(res) => {
          console.log(res)
          this.fornecedores = res
        }
      }
    )
  }

  showAddfornecedor() {
    this.visible = true;
  }

  submitForm() {
    if (this.fornecedorForm.valid) { 
        const formData = this.fornecedorForm.value; // get the form data
  
        this.insumosService.createFornecedor(formData).subscribe({
          next: async () => {
            this.getFornecedores()
            this.sharedService.showToastSuccess("Fornecedor criado com sucesso");
            this.visible = false
            this.fornecedorForm.reset();
          },
          error: async () => {
            this.sharedService.showToastError("Ocorreu algum problema no registro");
          }
        }
            
        );
    } else {
        this.sharedService.showToastError("Insira valores validos");
    }
  }
}
