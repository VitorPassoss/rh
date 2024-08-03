import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StaffService } from './staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {


  staffs:any[] = [];

  staffForm: FormGroup
  visible: boolean = false;
  statusVis:boolean = false
  editingStaff:boolean = false;
  empresas:any = []
  cargos:any = []
  status:any = []
  turnos:any = []
  selected:any = null
  idStaffSelected = null;
    searchString: string = '';

  items = [
    {
        label: 'Alterar Situção',
        command: () => {
        }
    },
   
    {
        label: 'Descartar',
        command: () => {
        }
    },
    {
      label: 'Deletar',
      command: () => {
      },
    },
    {
      label: 'Editar ',
      command: () => {
      }
},
   
];
  
  constructor(
    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    public loadingService: LoadingService,
    public staffService: StaffService,
    public routerService: Router
  ){
    this.staffForm = this.formBuilder.group({
      nome: [null, Validators.required],
      pis: [null, Validators.required],
      jornada: [null, Validators.required],
      turnos: [null, Validators.required],
      contato_phone: [null, [Validators.required]],
      contato_email: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      empresa: [null, Validators.required],
      status: [null, Validators.required],
      cargo: [null, Validators.required],
      dt_nascimento: [null, Validators.required],
      dt_entrada: [null],
      dt_saida: [null],
      custo_beneficios: [0],
      custo_salario: [0],
      custo_bruto: [0],
    });
  }

  ngOnInit() {
    this.getStaffs()
    this.getEmpresas()
    this.getCargos()
    this.getStatus()
    this.getTurnos()
  }


  async getStaffs(){
    this.loadingService.present();

    this.staffService.getStaffs().subscribe(
      {
        next: async(res) => {
          this.loadingService.dismiss();
          this.staffs = res
        }
      }
    )
  }

  showAddStaff() {
    this.editingStaff = false;
    this.visible = true;
    this.statusVis = false
    this.staffForm.reset()

  }

  showEditstaff(staff: any) {
    this.editingStaff = true;
    this.staffForm.patchValue(staff); 
    this.visible = true;
    
  }


  searchList(){
    var bodySearch = {
      'search_string': this.searchString
    }

    this.loadingService.present();


    this.staffService.search(bodySearch).subscribe({
      next: async (res) => {
        console.log(res)
        this.staffs = res
        this.loadingService.dismiss();

      },
      error: async () => {
        this.loadingService.dismiss();

        this.sharedService.showToastError("Ocorreu algum problema na busca do usuario");
      }
    });
  }
  

  updateStatus(staff:any){
    this.statusVis = true
        this.editingStaff = true;

    this.idStaffSelected = staff.id

    this.staffForm.patchValue({
      ...staff,
      status: staff.status.id,
      empresa: staff.empresa.id,
      cargo: staff.cargo.id,
      turnos: staff.turnos.id,
    });
  }


  async delete(id:number){
    this.loadingService.present()
    this.staffService.deleteStaffs(id).subscribe(
      {
        next: async (res:any) => {
          this.loadingService.dismiss()
          this.sharedService.showToastSuccess('Fornecedor deletado com sucesso')
          this.getStaffs()
        },
        error: async (err:any) => {
          this.loadingService.dismiss()
          this.sharedService.showToastError('Erro ao deletar fornecedor: '+ err)
        }
      }
    )
  }

  viewStaff(id: any) {
    this.routerService.navigate(['/staff/details/', id]);
  }
  

  onRowSelect(e:any){
    this.routerService.navigate(['/staff/details/', this.selected.id]);

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
  
      if (this.statusVis) { 
        this.staffService.updtStaffs(this.idStaffSelected,formData).subscribe({
          next: async () => {
            this.getStaffs();
            this.sharedService.showToastSuccess("Processo Seletivo atualizado com sucesso");
            this.visible = false;
            this.statusVis = false;
            this.staffForm.reset();
            this.loadingService.dismiss();

          },
          error: async () => {
            this.sharedService.showToastError("Ocorreu algum problema no registro");
            this.loadingService.dismiss();

          }
        });
      
      } else { 
        this.staffService.saveStaffs(formData).subscribe({
          next: async () => {
            this.getStaffs();
            this.sharedService.showToastSuccess("Staff criada com sucesso");
            this.visible = false;
            this.staffForm.reset();
            this.loadingService.dismiss();

          },
          error: async () => {
            this.loadingService.dismiss();
            this.sharedService.showToastError("Ocorreu algum problema no registro");
          }
        });
      }
    } else {
      this.sharedService.showToastError("Preencha os campos corretamentes");
    }
  }

  copyLink() {
    const link = "https://rh-orcin.vercel.app/create";
    
    navigator.clipboard.writeText(link).then(() => {
        alert("O link foi copiado para a área de transferência!");
    }).catch(err => {
        console.error("Erro ao copiar o link: ", err);
    });
}


cleaned(){
  this.getStaffs();
}

}
