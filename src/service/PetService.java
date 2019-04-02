package service;

import java.util.List;
import java.util.Map;

import dao.PetDao;
import entity.Pet;

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
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 try {
			return petDao.queryAllByLimits(page, limits);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	
			return null;
		}
	 }
	 public List<Map<String, Object>> selectPet(String selItem, String selContent){ 
		   try { 
				return petDao.selectPet(selItem, selContent);
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 

	 
	 public List<Map<String, Object>> selectPetByLimits(String selItem,String selContent,int pageSize,int currPage){  
		 try { 
				return petDao.selectPetByLimits(selItem, selContent, pageSize, currPage);
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	public void addPet(Pet pet){
		try {
			  petDao.addPet(pet);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	 
		} 
	}
	public List<Map<String, Object>> queryByCusId(String customerCode) {
		try {
			return petDao.queryByCusId(customerCode);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	 
		}
		return null;
	}
}
