import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent {
  staffForm: FormGroup
  staff:any = null;
  userId: any;
  empresas:any = []
  cargos:any = []
  status:any = []
  turnos:any = []

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
    cpf: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
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
    this.getStaff();
    this.getEmpresas()
    this.getCargos()
    this.getStatus()
    this.getTurnos()

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

  async getStaff(){
    this.userId = this.route.snapshot.paramMap.get('id')!;
  
    this.staffService.getDetail(this.userId).subscribe(
      {
        next: async(res) => {
          this.staff = res;
            this.staffForm.patchValue({
              ...res,
              empresa: res.empresa.id,
              cargo: res.cargo.id,
              turnos: res.turnos.id,
              status: res.status.id,
              dt_nascimento: res.dt_nascimento ? new Date(res.dt_nascimento) : null

            });
          
        }
      }
    )
  }
  


 submitForm() {
    if (this.staffForm.valid) {
      const formData = this.staffForm.value;
  
        this.staffService.updtStaffs(this.userId, formData).subscribe({
          next: async () => {
            this.getStaff()
            this.sharedService.showToastSuccess("Staff atualizado com sucesso");
          },
          error: async () => {
            this.sharedService.showToastError("Ocorreu algum problema na atualização");
          }
        });
    }else {
      this.sharedService.showToastError("Preencha os campos corretamentes");
    }
}

}
