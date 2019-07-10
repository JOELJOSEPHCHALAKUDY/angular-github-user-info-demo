import { EasydatePipe } from './pipes/easydate.pipe';
import { AlertService } from './services/alert.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { OnReturnDirective } from './directives/return.directive';



// all shared  components , pipes and services are added to this module
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent,
    EasydatePipe,
    OnReturnDirective
  ],
  providers:[ 
    AlertService,
   ],
  exports:[
    AlertComponent,
    EasydatePipe,
    OnReturnDirective
  ]
})
export class SharedModule { }
