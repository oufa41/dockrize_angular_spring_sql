import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  greeting: any;
  name: string;
  employeeDataByIDForm;
  allEmployees: Employee[];
  employee;
  
  constructor(
    private usersService: EmployeeService,
    private route: Router,
    private forBuilder: FormBuilder,
    private webSocketService: WebSocketService
  ) {
    this.employeeDataByIDForm = this.forBuilder.group({
      employeeId: ''
    });


  }

  ngOnInit() {
    this.connect();
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.usersService.getAllEmployees().subscribe(
      result => {
        this.allEmployees = result;
        // console.log(this.allEmployees);
      })
  }

  getEmployeeIdSubmit() {
    const employeeId = this.employeeDataByIDForm.value.employeeId;
    if (employeeId || employeeId === 0) {
      this.usersService.getEmployeeById(employeeId)
        .subscribe(result => {
          console.log(result)
          this.employee = result;
        });
    }
  }
  updateEmployee(employeeID: number) {
    
    this.route.navigate(['operations/updateEmployee', employeeID]);
  }
  connect() {
    this.webSocketService._connect(this.handleMessage, this);
  }

  handleMessage(message, component) {
    message = JSON.parse(message.body);
    
    if(message.operation ==="POST"){
      component.allEmployees.push(message.data);
    }
    if(message.operation ==="DELETE"){
      component.allEmployees = component.allEmployees.filter(employee => employee.id !==message.data);
    }
    if(message.operation ==="PUT"){
      // let getEmployee = component.allEmployees.find(employee => employee.id === message.data.id);
      // let index = component.allEmployees.indexOf(getEmployee);
      let index  = component.allEmployees.findIndex(employee => employee.id === message.data.id);
      component.allEmployees[index] = message.data;
    }
  }
 
}
