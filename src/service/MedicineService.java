package service;

import java.util.List;
import java.util.Map;

import dao.MedicineDao;
import entity.Medicine;
import entity.medicine.Categary;

public class MedicineService {
	MedicineDao medicineDao = new MedicineDao();
	public List<Map<String, Object>> searchMedicineName(String medicine) {
		try { 
			return medicineDao.searchMedicineName(medicine);
		} catch (Exception e) {
			System.out.println("操作数据库出错！");
			return null;
		}
	}
	public List<Map<String, Object>> queryAllMedicine(int page, int limit){
		try {
			return medicineDao.queryAllMedicine(page,limit);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}
	public void deleteMedicine(String id){
		try {
			 medicineDao.deleteMedicine(id);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void updateMedicine(Medicine medicine){
		try {
			 medicineDao.updateMedicine(medicine);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void addMedicine(Medicine medicine){
		try {
			 medicineDao.addMedicine(medicine);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
public List<Map<String, Object>> selectMedicine(String selItem,String selContent) {
		
		try {
			return medicineDao.selectMedicine(selItem, selContent);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
