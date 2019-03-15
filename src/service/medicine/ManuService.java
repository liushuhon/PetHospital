package service.medicine;

import java.util.List;
import java.util.Map;

import dao.medicine.CategaryDao;
import dao.medicine.ManuDao;
import entity.medicine.Categary;
import entity.medicine.Manufacture;

public class ManuService {
	ManuDao manuDao = new ManuDao(); 
	public List<Map<String, Object>> queryAllManu(int page, int limit){
		try {
			return manuDao.queryAllManu(page, limit);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}
	public void deleteManu(String id){
		try {
			manuDao.deleteManu(id);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void updateManu(Manufacture manu){
		try {
			manuDao.updateManu(manu);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void addManu(Manufacture manu){
		try {
			manuDao.addManu(manu);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
public List<Map<String, Object>> selectManu(String selItem,String selContent) {
		
		try {
			return manuDao.selectManu(selItem, selContent);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
