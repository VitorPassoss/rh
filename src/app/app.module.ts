import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { InsumosModule } from './pages/insumos/insumos.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ProducaoModule } from './pages/producao/producao.module'
import { SaidasModule } from './pages/saidas/saidas.module';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    InsumosModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    ProducaoModule,
    SaidasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
