import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { EmployeeErrorHandler } from '../modules/employee-error-handler/employee-error-handler.module';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  deleteEmployeeDataByIDForm;
  errorMsg: any;

  constructor(
    public usersService: EmployeeService,
    private forBuilder: FormBuilder,
    // public errorHandler: EmployeeErrorHandler
  ) {
    this.deleteEmployeeDataByIDForm = this.forBuilder.group({
      employeeId: 0
    });
  }

  ngOnInit() {
  }

  deleteEmployeeIdSubmit(employeeId: number) {
    this.usersService.deleteEmployeeById(employeeId).subscribe(result => {
      window.alert(result);
    }, error => {
    this.errorMsg = error
   
    });
  }
  

}

