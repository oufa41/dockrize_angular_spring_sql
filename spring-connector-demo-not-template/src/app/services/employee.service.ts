import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { catchError, retry } from 'rxjs/operators'
import { Observable, throwError, of, EMPTY, Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = [];
  employeeAPI: string;
  public error: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.employeeAPI = 'http://localhost:8080/api/employees';
    this.error = new EventEmitter<any>();
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeAPI);
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.employeeAPI + '/' + employeeId).pipe(catchError(this.handleError));
  }

  saveEmployee(employee: Employee) {
    return this.http.post(this.employeeAPI, employee);

  }

  updateEmployee(value: Employee) {
    return this.http.put(this.employeeAPI, value);
  }

  deleteEmployeeById(employeeId: number) {
    return this.http.delete(this.employeeAPI + '/' + employeeId).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
 
    return  throwError(error.error.message);
  }
}
