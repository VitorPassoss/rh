import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProducaoService } from '../producao.service';
import { SharedService } from 'src/app/shared/shared.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-tipo-produtos',
  templateUrl: './tipo-produtos.component.html',
  styleUrls: ['./tipo-produtos.component.scss']
})
export class TipoProdutosComponent implements OnInit {

  visible: boolean = false;
  tipoProdutoForm: FormGroup
  productItems:any[] = []
  grandezas:any[] = []

  constructor(
    private formBuilder: FormBuilder,
    public producaoService: ProducaoService,
    public sharedService: SharedService,
    public loadingService: LoadingService
  ){
    this.tipoProdutoForm = this.formBuilder.group({
      nome: [null],
      grandeza: ['Kg'],
      codigo: [null],
    })
  }

  ngOnInit() {
    this.getProdutos()
    this.grandezas = [
      'Kg' ,
      'L' ,
      'Un' 
    ]   
  }

  showAddtype(){
    this.visible = true
  }

  async getProdutos(){
    this.producaoService.getProdutos().subscribe(
      {
        next: async (res:any) => {
          this.productItems = res
        },
        error: async (err:any) => {
          this.sharedService.showToastError("Falha ao carregar produtos")
        }
      }
    )

  }


  submitForm() {
    this.loadingService.present()
    if (this.tipoProdutoForm.valid) { 
        const formData = this.tipoProdutoForm.value; // get the form data
        this.producaoService.createTypeProduct(formData).subscribe(
          {
            next: async(res)=>{
              this.loadingService.dismiss()
              this.sharedService.showToastSuccess("Tipo de produto criado com sucesso");
              this.visible = false
              this.getProdutos()
            }
          }
        )
        
    } else {
      this.sharedService.showToastError("Ocorreu algum problema no registro");
    }
  }
}
