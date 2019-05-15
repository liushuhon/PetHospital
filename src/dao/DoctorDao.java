package dao;

import java.util.List;
import java.util.Map;

import entity.Doctor;
import util.CommonDAO;

public class DoctorDao {

	private CommonDAO commonDAO = new CommonDAO();
	 public List<Map<String, Object>> queryAllDoctor(){
		try {
			String sql = "SELECT * FROM doctor";
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
				String sql = "SELECT * FROM doctor order by id desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	 
	 public List<Map<String, Object>> selectDoctor(String selItem, String selContent){ 
		   try {
			   String sql = "select * FROM doctor WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 

	 
	 public List<Map<String, Object>> selectDoctorByLimits(String selItem,String selContent,int pageSize,int currPage){ 
		 int startIndex = (currPage - 1) * pageSize; 
		 try {
			   String sql = "select * FROM doctor WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit " +startIndex+","+pageSize;
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 
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
	 public List<Map<String, Object>> findDoctorByCode(String code){
		 
		 try {
				String sql = "select * from  doctor where doctorCode='" + code + "'";
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
			String gender = doctor.getGender();
			String photo = doctor.getPhoto();
			try {
				String sql = "update doctor set age='" + age + "',photo='" + photo + "',phone='" + phone
						+ "',medicalSkill='" + medicalSkill+ "',description='" + description+ "',gender='" + gender+ "' "+"where doctorCode='" + doctorCode+"'" ;
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
		public List<Map<String, Object>> queryByMedicalSkill(String medicalSkil){
			 
			 try {
					String sql = "select * from doctor where medicalSkill ='"+ medicalSkil+ "'";
					List<Map<String, Object>> doctors = this.commonDAO.excuteQuery(sql, null);
					return doctors;
				}
				catch(Exception e){
					new Exception("操作数据库出错！").printStackTrace();;
				}
				return null;
		  }
		public List<Map<String, Object>> queryAll(){
			 
			 try {
					String sql = "select * from doctor";
					List<Map<String, Object>> doctors = this.commonDAO.excuteQuery(sql, null);
					return doctors;
				}
				catch(Exception e){
					new Exception("操作数据库出错！").printStackTrace();;
				}
				return null;
		  }
		
		public void updateDoctorByAdmin(String doctorCode,String workTime,String jobTitle,String level,String medicalSkill) {  
			
			try {
				String sql = "update doctor set workTime='" + workTime + "',workTime='" + jobTitle + "',jobTitle='" + workTime + "'，level='" + level + "'，medicalSkill='" + medicalSkill + "'where doctorCode='" + doctorCode+"'" ;
						this.commonDAO.executeUpdate(sql, null);
				System.out.print(sql);
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
		}
}
