package service;

import java.util.List;
import java.util.Map;

import dao.MedicineDao;

public class MedicineService {
	MedicineDao medicineDao = new MedicineDao();
	public List<Map<String, Object>> searchMedicineName(String medicine) {
		return medicineDao.searchMedicineName(medicine);
	}

}
