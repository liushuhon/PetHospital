package service;

import java.util.List;
import java.util.Map;

import dao.DoctorDao;
import entity.Doctor;

public class DoctorService {
	DoctorDao doctorDao = new DoctorDao();
	public List<Map<String, Object>> queryAllDoctor(){
		return doctorDao.queryAllDoctor();
	}
	 public List<Map<String, Object>> selectDoctor(String selItem, String selContent){ 
		 return doctorDao.selectDoctor(selItem, selContent);
	 }
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 return doctorDao.queryAllByLimits(page, limits);
	 }
	 public List<Map<String, Object>> selectDoctorByLimits(String selItem,String selContent,int pageSize,int currPage){ 
			return doctorDao.selectDoctorByLimits(selItem, selContent, pageSize, currPage);
	 }
	
	public List<Map<String, Object>> findDoctorById(String id) { 
		return doctorDao.findDoctorById(id);
	}
	public List<Map<String, Object>> findDoctorByCode(String id) { 
		return doctorDao.findDoctorByCode(id);
	}

	public List<Map<String, Object>> updateDoctor(Doctor doctor) { 
		return doctorDao.updateDoctor(doctor);
	}

	public List<Map<String, Object>> findDoctorByUsernameAndPassword(
			String username, String password) { 
		return doctorDao.findDoctorByUsernameAndPassword(username, password);
	}

	public List<Map<String, Object>> changePassword(String password,
			String username) { 
		return doctorDao.changePassword(password, username);
	}
	public List<Map<String, Object>> queryByMedicalSkill(String medicalSkil){
		return doctorDao.queryByMedicalSkill(medicalSkil);
	}
	public List<Map<String, Object>> queryAll(){
		return doctorDao.queryAll();
	}
	public void updateDoctorByAdmin(String doctorCode,String workTime,String jobTitle,String level,String medicalSkill) {  
		doctorDao.updateDoctorByAdmin(doctorCode, workTime, jobTitle, level, medicalSkill);
	}
	public void addDoctorByAdmin(String doctorCode,String workTime,String jobTitle,String level,String medicalSkill,String username,String doctorName,String phone) {  
		doctorDao.addDoctorByAdmin(doctorCode, workTime, jobTitle, level, medicalSkill, username, doctorName,phone);
	}
}
