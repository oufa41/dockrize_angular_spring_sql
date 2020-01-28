import { NgModule, ErrorHandler, Injectable, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class EmployeeErrorHandler implements ErrorHandler {

  public message = 'test';

  handleError(error: any): void {
   // this.message = error.error.message;
   // console.log(this.message);
  }

}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    //{ provide: ErrorHandler, useClass: EmployeeErrorHandler }
  ]
})
export class EmployeeErrorHandlerModule { }
