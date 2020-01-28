import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  employee: Employee;
  id: number;
  updateEmployeeForm;
  constructor(
    private usersService: EmployeeService,
    private forBuilder: FormBuilder,
    private route: ActivatedRoute) { 
    this.updateEmployeeForm = this.forBuilder.group({
      email: '',
      firstName: '',
      lastName: ''
    });
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("employee: "+this.id);
    this.usersService.getEmployeeById(this.id)
    .subscribe(result => {
      console.log(result)
      this.employee = result;
      console.log("employee: "+this.id);
      this.updateEmployeeForm = this.forBuilder.group({
        email: this.employee.email,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName
      });
    },
    error => console.log(error));
  }
  updateEmployeeSubmit(value: Employee) {
    console.log("lastname "+value.lastName);
    this.employee = value;
    this.employee.id = this.id;
    this.usersService.updateEmployee(this.employee).subscribe(result => {
      window.alert("Your data is updated");
    },error => window.alert(error));

  }
}
