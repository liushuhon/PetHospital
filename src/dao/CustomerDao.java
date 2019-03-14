package dao;

import java.util.List;
import java.util.Map;

import entity.Customer;
import util.CommonDAO;

public class CustomerDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addCustomer(){
		 String userName = "liuliu";
		 String password = "111111";
		 
		 String phone = "15023875746";
		 String address = "liushuhong";
		   try {
				String sql = "insert into customer (userName,password,phone,address)"
						+ "values('"+userName+"','"+password+"','"+phone+"','"+address+"');";
				
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	 public List<Map<String, Object>> queryAllCustomer(){
		try {
			String sql = "SELECT * FROM customer";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return null;  
	 }
	 
}
