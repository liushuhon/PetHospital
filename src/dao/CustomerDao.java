package dao;

import java.util.List;
import java.util.Map;

import entity.Customer;
import util.CommonDAO;

public class CustomerDao {
	private CommonDAO commonDAO = new CommonDAO();
	 public void addCustomer(Customer customer){ 
		   try {
				String sql = "insert into customer (userName,password,phone,address,gender,customerCode,photo)"
						+ "values('"+customer.getUserName()+"','"+customer.getPassword()+"','"+customer.getPhone()+"','"+customer.getAddress()+"'"
								+ ",'"+customer.getGender()+"','"+customer.getCustomerCode()+"','"+customer.getPhoto()+"');";
				
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
	  
		
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "SELECT * FROM customer order by id desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
		 }
	 public List<Map<String, Object>> login(String phone, String password){ 
		   try {
				String sql = "SELECT * from customer WHERE password='"+password+"' AND phone='"+phone+"'";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 public List<Map<String, Object>> selectCustomer(String selItem, String selContent){ 
		   try {
			   String sql = "select * FROM customer WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 
 
	 
	 public List<Map<String, Object>> selectCustomerByLimits(String selItem,String selContent,int pageSize,int currPage){ 
		 int startIndex = (currPage - 1) * pageSize; 
		 try {
			   String sql = "select * FROM customer WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit " +startIndex+","+pageSize;
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 public Map<String, Object> queryByCode(String code){ 
		   try {
				String sql = "SELECT * from customer WHERE customerCode='"+code+"'"; 
				List<Map<String, Object>> customerList =  this.commonDAO.excuteQuery(sql, null);  
				return customerList.get(0);
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
}
