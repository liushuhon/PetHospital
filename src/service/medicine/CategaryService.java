package service.medicine;

import java.util.List;
import java.util.Map;

import dao.medicine.CategaryDao;
import entity.medicine.Categary;

public class CategaryService {
	CategaryDao categaryDao = new CategaryDao();
	public List<Map<String, Object>> queryAllCategary(int page, int limit){
		try {
			return categaryDao.queryAllCategary(page,limit);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}
	public void deleteCategary(String id){
		try {
			 categaryDao.deleteCategary(id);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void updateCategary(Categary categary){
		try {
			 categaryDao.updateCategary(categary);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void addCategary(String categary){
		try {
			 categaryDao.addCategary(categary);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
public List<Map<String, Object>> selectCategary(String selItem,String selContent) {
		
		try {
			return categaryDao.selectCategary(selItem, selContent);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
