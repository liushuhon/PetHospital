package service.medicine;

import java.util.List;
import java.util.Map;

import dao.medicine.SpecificationDao;
import entity.medicine.Specification;
 
public class SpecificationService {
	SpecificationDao sDao = new SpecificationDao();
	public List<Map<String, Object>> queryAllSpeci(int page, int limit){
		try {
			return sDao.queryAllSpeci(page,limit);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}
	public void deleteSpeci(String id){
		try {
			 sDao.deleteSpeci(id);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void updateSpeci(Specification specification){
		try {
			 sDao.updateSpeci(specification);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
	public void addSpeci(Specification specification){
		try {
			 sDao.addSpeci(specification);
		} catch (Exception e) { 
			new Exception("操作数据库出错！").printStackTrace();
		}
	}
public List<Map<String, Object>> selectSpeci(String selItem,String selContent) {
		
		try {
			return sDao.selectSpeci(selItem, selContent);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
