package com.example.spring.boot.demo.jpa.rest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EmployeeRestExceptionHandler {
	
	@ExceptionHandler
	public ResponseEntity<EmployeeErrorResponse> handleException(EmployeeNotFoundException employeeException){
		
		EmployeeErrorResponse error = new EmployeeErrorResponse();
		error.setStatus(HttpStatus.NOT_FOUND.value());
		error.setMessage(employeeException.getMessage());
		error.setTimeStamp(System.currentTimeMillis());
		ResponseEntity<EmployeeErrorResponse> responseEntity = new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
		return responseEntity; 
	}
	@ExceptionHandler
	public ResponseEntity<EmployeeErrorResponse> handleException(Exception exception){
		
		EmployeeErrorResponse error = new EmployeeErrorResponse();
		error.setStatus(HttpStatus.BAD_REQUEST.value());
		error.setMessage(exception.getMessage());
		error.setTimeStamp(System.currentTimeMillis());
		return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
	}

}
