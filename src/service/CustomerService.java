package service;

import java.util.List;
import java.util.Map;

import dao.CustomerDao;

public class CustomerService {
	CustomerDao customerDao = new CustomerDao();
	public List<Map<String, Object>> queryAllCustomer(){
		return customerDao.queryAllCustomer();
	}
}
