package com.example.spring.boot.demo.jpa.rest.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.spring.boot.demo.jpa.rest.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Integer>{

}
