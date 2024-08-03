import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrls: ['./staff-register.component.scss']
})
export class StaffRegisterComponent {
  staffForm: FormGroup 
  staff:any = null;
  userId: any;
  empresas:any = []
  cargos:any = []
  status:any = []
  turnos:any = []
  

  created:boolean = false;

  constructor(    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    public loadingService: LoadingService,
    public staffService: StaffService,
    public routerService: Router,
    private route: ActivatedRoute
  ) {
    this.staffForm = this.formBuilder.group({
    nome: [null, Validators.required],
    pis: [null, Validators.required],
    jornada: [null, Validators.required],
    turnos: [null, Validators.required],
    contato_phone: [null, Validators.required],
    contato_email: [null, [Validators.required, Validators.email]],
    cpf: [null, [Validators.required]],
    empresa: [null, Validators.required],
    status: [null, Validators.required],
    cargo: [null, Validators.required],
    dt_nascimento: [null, Validators.required],
    dt_entrada: [null],
    dt_saida: [null],
    custo_beneficios: [0],
    custo_salario: [0],
    custo_bruto: [0]
  }); }

  ngOnInit(): void {
    this.getEmpresas();
    this.getCargos();
    this.getStatus();
    this.getTurnos();
  }


  getEmpresas(){
    this.staffService.getEmpresas().subscribe(
      {
        next: async(res) => {
          this.empresas = res
        }
      }
    )
  }

  getCargos(){
    this.staffService.getCargos().subscribe(
      {
        next: async(res) => {
          this.cargos = res
        }
      }
    )
  }

  getTurnos(){
    this.staffService.getTurnos().subscribe(
      {
        next: async(res) => {
          this.turnos = res
        }
      }
    )
  }

  getStatus(){
    this.staffService.getStatus().subscribe(
      {
        next: async(res) => {
          this.status = res
        }
      }
    )
  }




  submitForm() {
    this.loadingService.present();
    if (this.staffForm.valid) {
      const formData = this.staffForm.value;
  
        this.staffService.saveStaffs(formData).subscribe({
          next: async () => {
            this.created = true
            this.loadingService.dismiss();
            this.sharedService.showToastSuccess("Staff criada com sucesso");
          },
          error: async () => {
            this.loadingService.dismiss();
            this.sharedService.showToastError("Ocorreu algum problema no registro");
          }
        });
      }
     else {
      this.sharedService.showToastError("Preencha os campos corretamentes");
    }
  
  }
}
