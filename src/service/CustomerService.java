package service;

import java.util.List;
import java.util.Map;

import dao.CustomerDao;
import entity.Customer;

public class CustomerService {
	CustomerDao customerDao = new CustomerDao();
	public List<Map<String, Object>> queryAllCustomer(){
		return customerDao.queryAllCustomer();
	}
	public void addCustomer(Customer customer){
		this.customerDao.addCustomer(customer);
	}
	public List<Map<String, Object>> login(String phone, String password){ 
		return customerDao.login(phone, password);
	}
	public Map<String, Object> queryByCode(String code){ 
		return customerDao.queryByCode(code);
	}
	 public List<Map<String, Object>> selectCustomer(String selItem, String selContent){ 
		 return customerDao.selectCustomer(selItem, selContent);
	 }
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 return customerDao.queryAllByLimits(page, limits);
	 }
	 public List<Map<String, Object>> selectCustomerByLimits(String selItem,String selContent,int pageSize,int currPage){ 
			return customerDao.selectCustomerByLimits(selItem, selContent, pageSize, currPage);
	 }
}
