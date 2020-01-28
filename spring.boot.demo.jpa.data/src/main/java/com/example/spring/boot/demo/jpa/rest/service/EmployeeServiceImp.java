package com.example.spring.boot.demo.jpa.rest.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.spring.boot.demo.jpa.rest.dao.EmployeeRepository;
import com.example.spring.boot.demo.jpa.rest.entity.Employee;

@Service
public class EmployeeServiceImp implements EmployeeService {

	private EmployeeRepository employeeRepository;

	public EmployeeServiceImp(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}

	@Override
	public List<Employee> findAll() {
		// TODO Auto-generated method stub
		return employeeRepository.findAll();
	}

	@Override
	public Employee findById(int theId) {
		// TODO Auto-generated method stub
		Optional<Employee> result = employeeRepository.findById(theId);
		Employee employee = null;
		if (result.isPresent()) {
			employee = result.get();
		} /*
			 * else { throw new EmployeeNotFoundException("Didnot find employee id -" +
			 * theId); }
			 */
		return employee;
	}

	@Override
	public void save(Employee theEmployee) {
		// TODO Auto-generated method stub
		employeeRepository.save(theEmployee);
	}

	@Override
	public void deletebyId(int theId) {
		// TODO Auto-generated method stub
		employeeRepository.deleteById(theId);
	}

}
