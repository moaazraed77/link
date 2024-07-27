import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeLinksComponent } from './home-links/home-links.component';
import { HomeLinksModule } from './home-links/home-links.module';
// import { AsdComponent } from './asd/asd.component';
import { PartinaersComponent } from './partinaers/partinaers.component';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    // AsdComponent,
    PartinaersComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeLinksModule,
    FileUploadModule,
    ToastModule,
    TableModule
  ],
  exports:[
    // AsdComponent
  ],
  providers:[
    MessageService,
  ]
})
export class AdminModule { }
