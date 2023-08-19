import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';

import { PanelModule } from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabViewModule,
    PanelModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  exports:[
    TabViewModule,
    PanelModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]

})
export class SharedModule { }
