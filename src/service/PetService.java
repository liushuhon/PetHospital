package service;

import java.util.List;
import java.util.Map;

import dao.PetDao;

public class PetService {
	PetDao petDao = new PetDao();
	public List<Map<String, Object>> queryAllPets(){
		try {
			return petDao.queryAllPets();
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	
			return null;
		} 
	}
}
