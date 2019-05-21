package dao;

import java.util.List;
import java.util.Map;

import entity.Registration;
import util.CommonDAO;

public class RegistrationDao {
	CommonDAO commonDAO = new CommonDAO();
	/**
	 * 用户的订单
	 * @param doctorId
	 * @param state
	 * @return
	 */
	public List<Map<String, Object>> findRegistrationByCustId(String customerId,String state) {
		try {
			String sql = "select * from  registration where state='"+state+"' and customerId = '"+ customerId +"'order by date DESC";
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	/***
	 * 用户的分页订单
	 * @param page
	 * @param limits
	 * @return
	 */
	 public List<Map<String, Object>> queryAllByLimitsForCust(String customerId, int page, int limits, String state){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "SELECT * FROM registration where state = '"+state+"' and customerId = '"+customerId+"' order by date desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	/**
	 * 医生的订单
	 * @param doctorId
	 * @param state
	 * @return
	 */
	public List<Map<String, Object>> findRegistrationByDoctorId(String doctorId,String state) {
		try {
			String sql = "select * from  registration where state='"+state+"' and doctorId = '"+ doctorId +"'order by date DESC";
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	/***
	 * 医生的分页订单
	 * @param page
	 * @param limits
	 * @return
	 */
	 public List<Map<String, Object>> queryAllByLimits(String doctorId, int page, int limits, String state){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "SELECT * FROM registration where state = '"+state+"' and doctorId = '"+doctorId+"' order by date desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
 
	public List<Map<String, Object>> findRegistrationDealed(String doctorId) {
		try {
			String sql = "select * from  registration where state='已处理' and doctorId = '"+ doctorId +"' order by date DESC";
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public List<Map<String, Object>> findRegistrationByCode(String registrationCode) {
		
		try {
			String sql = "SELECT doctor.*,customer.*,registration.*,pet.* FROM doctor ,customer ,registration ,pet where registration.doctorId = doctor.doctorCode AND registration.customerId = customer.customerCode AND registration.petId = pet.petCode AND registrationCode='"+registrationCode+"'";
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public void updateState(String registrationCode){
		try {
			String sql = "update registration SET state='已处理' WHERE registrationCode='"+registrationCode+"'";
			this.commonDAO.executeUpdate(sql, null);
			
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
	} 
	public void updateStateAndDate(String registrationCode,String state,String regisTime, String date){
		try {
			String sql = "update registration SET state='"+state+"',regisTime = '"+regisTime+"',date = '"+date+"' WHERE registrationCode='"+registrationCode+"'";
			this.commonDAO.executeUpdate(sql, null);
			
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		
	}
	public List<Map<String, Object>> selectRegistration(String selItem,String doctorId, String selContent,String state) {
		
		try {
			String sql ="";
			if (doctorId=="") {
				sql = "select * FROM registration WHERE state = '待处理' AND  "+selItem+" like '%"+selContent+"%' order by date DESC";
			} else {
				sql = "select * FROM registration WHERE state = '"+state+"' AND doctorId='"+doctorId+"' AND "+selItem+" like '%"+selContent+"%' order by date DESC";
			} 
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public List<Map<String, Object>> selectRegistrationByLimit(String selItem,String doctorId, String selContent,int pageSize,int currPage,String state) {
		int startIndex = (currPage - 1) * pageSize; 
		try {
			String sql ="";
			if (doctorId=="") {
				sql = "select * FROM registration WHERE state = '待处理' AND  "+selItem+" like '%"+selContent+"%' order by date DESC";
			} else {
				sql = "select * FROM registration WHERE state = '"+state+"' AND doctorId='"+doctorId+"' AND "+selItem+" like '%"+selContent+"%' order by date DESC limit " +startIndex+","+pageSize;
			} 
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public void addRegistration(Registration registration) {
		try {
			String sql = "insert into registration (registrationCode,petId,customerId,doctorId,customerName,customerPhone,doctorName,category,date,state,petName,regisTime)"
						+ "values('"+registration.getRegistrationCode()+"','"+registration.getPetId()+"','"+registration.getCustomerId()+"','"+registration.getDoctorId()+"','"+registration.getCustomerName()+"'"
								+ ",'"+registration.getCustomerPhone()+"','"+registration.getDoctorName()+"','"+registration.getCategory()+"','"+registration.getDate()+"','"+registration.getState()+"','"+registration.getPetName()+"','"+registration.getRegisTime()+"');";
			this.commonDAO.executeUpdate(sql, null);
			 
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		} 
	}
	public List<Map<String, Object>> findRegistedTime(String doctorId,String date) {
		try {
			String sql = "SELECT * FROM registration WHERE regisTime LIKE '%"+date+"%' and doctorId ='"+doctorId+"'";
			return this.commonDAO.excuteQuery(sql, null);
			 
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
