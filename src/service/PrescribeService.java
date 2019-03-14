package service;

import java.util.List;
import java.util.Map;

import dao.PrescriptionDao;

public class PrescribeService {
	PrescriptionDao prescriptionDao = new PrescriptionDao();
	public List<Map<String, Object>> findPrescriptionByDoctorId(String doctorId) {
		return prescriptionDao.findPrescriptionByDoctorId(doctorId);
	}

	public List<Map<String, Object>> findPrescribeByCode(String prescriptionCode) {
		return prescriptionDao.findPrescribeByCode(prescriptionCode);
	}

	public List<Map<String, Object>> selectPrescription(String doctorId,
			String selContent, String selItem) {
		return prescriptionDao.selectPrescription(doctorId, selContent, selItem);
	}

}
