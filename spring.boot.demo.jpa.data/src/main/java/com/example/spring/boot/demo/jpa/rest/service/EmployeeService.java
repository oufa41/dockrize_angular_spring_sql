package com.example.spring.boot.demo.jpa.rest.service;

import java.util.List;

import com.example.spring.boot.demo.jpa.rest.entity.Employee;

public interface EmployeeService {
    
public List<Employee> findAll();
	
	public Employee findById(int theId);
	
	public void save(Employee theEmployee);
	
	public void deletebyId(int theId);
}
