package com.example.spring.boot.demo.jpa.rest.controller;

public class EmployeeErrorResponse {
	
	private int status;
	private String message;
	private long timeStamp;
	
	public EmployeeErrorResponse() {
		
	}
	

	public EmployeeErrorResponse(int status, String message, long timeStamp) {
		super();
		this.status = status;
		this.message = message;
		this.timeStamp = timeStamp;
	}


	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String meesage) {
		this.message = meesage;
	}

	public long getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}
	

}
