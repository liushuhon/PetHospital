package dao;
 

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.MediMiddlePrescri;
import entity.Prescription; 

public class PrescriptionDao {
	private CommonDAO commonDAO = new CommonDAO(); 
	 public void addPrescription(Prescription prescription){
		 
		   try {
				String sql = "insert into prescription (prescriptionCode,symptom,medicines,customerId,petId,doctorId,date,totalPrice) "
						+ "values('"+prescription.getPrescriptionCode()+"','"+prescription.getSymptom()+"','"+prescription.getMedicines()+"','"+prescription.getCustomerId()+"','"+prescription.getPetId()+"','"+prescription.getDoctorId()+"','"+prescription.getDate()+"','"+prescription.getTotalPrice()+"');";
				
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	 public List<Map<String, Object>> findPrescriptionByDoctorId(String doctorId) {
			try {
				String sql = "select customer.*,pet.*,prescription.*,doctor.* FROM customer,pet,prescription,doctor WHERE pet.petCode = prescription.petId AND customer.customerCode = prescription.customerId AND doctor.doctorCode = prescription.doctorId AND prescription.doctorId = '"+doctorId+"' order by prescription.date DESC";
				List<Map<String, Object>> prescriptions = this.commonDAO.excuteQuery(sql, null);
				return prescriptions;
			}
			catch(Exception e){
				System.out.println("操作数据库出错！");
			}
			return null;
		}
	public List<Map<String, Object>> findPrescribeByCode(String prescriptionCode) {
		try {
			String sql = "select customer.*,pet.*,prescription.*,doctor.* FROM customer,pet,prescription,doctor WHERE pet.petCode = prescription.petId AND customer.customerCode = prescription.customerId AND doctor.doctorCode = prescription.doctorId AND prescription.prescriptionCode = '"+prescriptionCode+"'";
			List<Map<String, Object>> prescriptions = this.commonDAO.excuteQuery(sql, null);
			return prescriptions;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	public List<Map<String, Object>> selectPrescription(String doctorId,String selContent,String selItem) {
		try {
			String sql="";
			if(selItem.equals("nickname")){
				 sql = "select customer.*,pet.*,prescription.*,doctor.* FROM customer,pet,prescription,doctor WHERE pet.petCode = prescription.petId AND customer.customerCode = prescription.customerId AND doctor.doctorCode = prescription.doctorId AND prescription.doctorId = '"+doctorId+"' and pet.nickname like '%"+selContent+"%'   order by prescription.date DESC";
				
			}else if(selItem.equals("userName")){
				 sql = "select customer.*,pet.*,prescription.*,doctor.* FROM customer,pet,prescription,doctor WHERE pet.petCode = prescription.petId AND customer.customerCode = prescription.customerId AND doctor.doctorCode = prescription.doctorId AND prescription.doctorId = '"+doctorId+"' and customer.userName like '%"+selContent+"%'   order by prescription.date DESC";
					
			}else if(selItem.equals("prescriptionCode")){
				 sql = "select customer.*,pet.*,prescription.*,doctor.* FROM customer,pet,prescription,doctor WHERE pet.petCode = prescription.petId AND customer.customerCode = prescription.customerId AND doctor.doctorCode = prescription.doctorId AND prescription.doctorId = '"+doctorId+"' and prescription.prescriptionCode like '%"+selContent+"%'   order by prescription.date DESC";
					
			}
			List<Map<String, Object>> prescriptions = this.commonDAO.excuteQuery(sql, null);
			return prescriptions;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
		 
	}
	
	 
}
