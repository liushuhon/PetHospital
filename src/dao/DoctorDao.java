package dao;

import java.util.List;
import java.util.Map;

import entity.Doctor;
import util.CommonDAO;

public class DoctorDao {

	private CommonDAO commonDAO = new CommonDAO();
	 public List<Map<String, Object>> findDoctorById(String id){
		 
		 try {
				String sql = "select * from  doctor where id='" + id + "'";
				List<Map<String, Object>> doctor = this.commonDAO.excuteQuery(sql, null);
				return doctor;
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
	  }
		public List<Map<String, Object>> updateDoctor(Doctor doctor) {  
			String doctorCode = doctor.getDoctorCode();
			int age = doctor.getAge(); 
			String phone = doctor.getPhone();
			String medicalSkill = doctor.getMedicalSkill();
			String description = doctor.getDescription(); 
			try {
				String sql = "update doctor set age='" + age + "',phone='" + phone
						+ "',medicalSkill='" + medicalSkill+ "',description='" + description+ "'"+"where doctorCode='" + doctorCode+"'" ;
						this.commonDAO.executeUpdate(sql, null);
				System.out.print(sql);
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
		}
		public List<Map<String, Object>> changePassword(String password,String username) {  
			 
			try {
				String sql = "update doctor set password='" + password +  "'"+"where username='" + username+"'" ;
						this.commonDAO.executeUpdate(sql, null);
				System.out.print(sql);
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
		}
		public List<Map<String, Object>> findDoctorByUsernameAndPassword(String username,String password){
			 
			 try {
					String sql = "select * from  doctor where username='" + username + "' and password = '" + password + "'";
					List<Map<String, Object>> doctor = this.commonDAO.excuteQuery(sql, null);
					return doctor;
				}
				catch(Exception e){
					new Exception("操作数据库出错！").printStackTrace();;
				}
				return null;
		  }
}
