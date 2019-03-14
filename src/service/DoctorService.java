package service;

import java.util.List;
import java.util.Map;

import dao.DoctorDao;
import entity.Doctor;

public class DoctorService {
	DoctorDao doctorDao = new DoctorDao();
	public List<Map<String, Object>> findDoctorById(String id) { 
		return doctorDao.findDoctorById(id);
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
		return changePassword(password, username);
	}

}
