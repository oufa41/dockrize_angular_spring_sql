import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { FormBuilder } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  saveEmployeeForm;
  constructor(
    private usersService: EmployeeService,
    private forBuilder: FormBuilder,
    private wbSocketService: WebSocketService) { 
    this.saveEmployeeForm = this.forBuilder.group({
      email: '',
      firstName: '',
      lastName: ''
    });
  }

  ngOnInit() {
    //this.wbSocketService.sendUpdates("Data is saved");
  }
  saveEmployeeSubmit(employee: Employee) {
    this.usersService.saveEmployee(employee).subscribe(result => {
      window.alert("Your data saved");
    },error => window.alert(error))
  }

}
