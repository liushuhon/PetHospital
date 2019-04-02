package dao;

import java.util.List;
import java.util.Map;

import entity.Registration;
import util.CommonDAO;

public class RegistrationDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> findRegistrationByDoctorId(String doctorId) {
		try {
			String sql = "select * from  registration where state='待处理' and doctorId = '"+ doctorId +"'order by date DESC";
			List<Map<String, Object>> registrations = this.commonDAO.excuteQuery(sql, null);
			return registrations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
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
	public List<Map<String, Object>> selectRegistration(String selItem,String doctorId, String selContent) {
		
		try {
			String sql ="";
			if (doctorId=="") {
				sql = "select * FROM registration WHERE state = '待处理' AND  "+selItem+" like '%"+selContent+"%' order by date DESC";
			} else {
				sql = "select * FROM registration WHERE state = '待处理' AND doctorId='"+doctorId+"' AND "+selItem+" like '%"+selContent+"%' order by date DESC";
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
}
