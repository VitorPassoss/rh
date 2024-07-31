import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; // Define um FormGroup para o formulário



  ngOnInit(): void {}

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sharedService: SharedService

  ){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.httpClient.post<any>(environment.urlApi + '/auth/login/', formData)
        .toPromise()
        .then(response => {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/staff'])
                  
        })
        .catch(async (error) => {
          this.sharedService.showToastError("Falha ao fazer login, verifique suas credenciais!.")
        });
    }
  }



}
