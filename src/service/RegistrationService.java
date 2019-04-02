package service;

import java.util.List;
import java.util.Map;

import dao.RegistrationDao;
import entity.Registration;

public class RegistrationService {
	RegistrationDao registrationDao = new RegistrationDao();
	public void updateState(String registrationCode) {
		registrationDao.updateState(registrationCode);
		
	}
	public List<Map<String, Object>> findRegistrationByDoctorId(String doctorId) {
		return registrationDao.findRegistrationByDoctorId(doctorId);
	}
	public List<Map<String, Object>> findRegistrationByCode(
			String registrationCode) {
		return registrationDao.findRegistrationByCode(registrationCode);
	}
	public List<Map<String, Object>> selectRegistration(String selItem,
			String doctorId, String selContent) {
		return registrationDao.selectRegistration(selItem, doctorId, selContent);
	}
	public void addRegistration(Registration registration) {
		 registrationDao.addRegistration(registration);
	}
}
