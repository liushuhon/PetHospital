package service;

import java.util.List;
import java.util.Map;

import dao.AdoptPetDao;
import dao.PetDao;
import entity.AdoptPet;

public class AdoptPetService {
	AdoptPetDao dao = new AdoptPetDao();
	public List<Map<String, Object>> queryAllPets(String state){
		try {
			return dao.queryAllPets(state);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	
			return null;
		} 
	}
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits,String state){
		 try {
			return dao.queryAllByLimits(page, limits, state);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	
			return null;
		}
	 }
	 public List<Map<String, Object>> selectPet(String selItem, String selContent, String state){ 
		   try { 
				return dao.selectPet(selItem, selContent, state);
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 

	 
	 public List<Map<String, Object>> selectPetByLimits(String selItem,String selContent,int pageSize,int currPage, String state){  
		 try { 
				return dao.selectPetByLimits(selItem, selContent, pageSize, currPage, state);
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 
	 public void  updatePet(AdoptPet pet){ 
		 try {
			dao.updatePet(pet);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
	 }
	 
	 public void deletePet(String code){ 
		 try {
			dao.deletePet(code);
		} catch (Exception e) {
			e.printStackTrace(); 
		}
	 }
	 
	 /***
	  * 用户查询所有领养宠物
	  * @param masterId
	  * @return
	  */
	 public List<Map<String, Object>> queryAllByMaster(String masterId) {

			try { 
				return dao.queryAllByMaster(masterId);
			} catch (Exception e) {
				new Exception("操作数据库出错！").printStackTrace();
			}
			return null; 
		}
	 /**
	  *  用户分页查询所有领养宠物
	  * @param page
	  * @param limits
	  * @return
	  */
		 public List<Map<String, Object>> queryAllByMasterLimits(int page, int limits, String masterId){ 
				try { 
					return dao.queryAllByMasterLimits(page, limits, masterId);
				}
				catch(Exception e){
					e.printStackTrace();
				}
				return null;  
		}
	 
}
