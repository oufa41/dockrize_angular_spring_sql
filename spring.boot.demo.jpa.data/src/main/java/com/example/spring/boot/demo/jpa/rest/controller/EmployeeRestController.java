package com.example.spring.boot.demo.jpa.rest.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.spring.boot.demo.jpa.rest.entity.Employee;
import com.example.spring.boot.demo.jpa.rest.service.EmployeeService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmployeeRestController {

	private final String toClient = "/topic/employees";

	private EmployeeService employeeService;
	private HashMap<String, Object> updatedEmployee = new HashMap<String, Object>();

	@Autowired
	public EmployeeRestController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	// expose "/employees" and return list of employees
	@GetMapping("/employees")
	public List<Employee> findAll() {
		return employeeService.findAll();
	}

	@MessageMapping("/hello")
	@SendTo(toClient)
	public List<Employee> greeting(@RequestBody String employee) {

		return employeeService.findAll();
	}

	@GetMapping("/employees/{employeeId}")
	public Employee getEmployee(@PathVariable int employeeId) {
		Employee theEmployee = employeeService.findById(employeeId);

		if (theEmployee == null) {
			throw new EmployeeNotFoundException("Employee id not found - " + employeeId);
		}
		return theEmployee;
	}

	@Autowired
	private SimpMessagingTemplate template;

	@PostMapping("/employees")
	public Employee addEmployee(@RequestBody Employee employee) {
		employee.setId(0);

		employeeService.save(employee);
		// sending the new employee over the websocket
		updatedEmployee.put("operation", "POST");
		updatedEmployee.put("data", employee);
		template.convertAndSend(toClient, updatedEmployee);
		return employee;
	}

	@PutMapping("/employees")
	public Employee updateEmployee(@RequestBody Employee employee) {

		Employee tempEmployee = employeeService.findById(employee.getId());

		if (tempEmployee == null) {
			throw new EmployeeNotFoundException("Employee id not found - " + employee.getId());
		}
		employeeService.save(employee);
		// sending the edited employee id over the websocket
		updatedEmployee.put("operation", "PUT");
		updatedEmployee.put("data", employee);
		template.convertAndSend(toClient, updatedEmployee);
		return employee;
	}

	@DeleteMapping("/employees/{employeeId}")
	public String deleteEmployee(@PathVariable int employeeId) {
		Employee tempEmployee = employeeService.findById(employeeId);

		if (tempEmployee == null) {
			throw new EmployeeNotFoundException("Employee id not found - " + employeeId);	
		}
		employeeService.deletebyId(employeeId);
		// sending the deleted employee id over the websocket
		updatedEmployee.put("operation", "DELETE");
		updatedEmployee.put("data", tempEmployee.getId());
		// template.convertAndSend(toClient, employeeService.findAll());
		template.convertAndSend(toClient, updatedEmployee);

		return "Delete employee id- " + employeeId;
	}
	

}
