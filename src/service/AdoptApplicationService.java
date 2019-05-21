package service;

import java.util.List;
import java.util.Map;

import dao.AdoptApplicationDao;

public class AdoptApplicationService {
	AdoptApplicationDao dao = new AdoptApplicationDao();
	public void addApplication(String petCode, String userCode) {
		try {
			dao.addApplication(petCode, userCode);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	public List<Map<String, Object>> queryApplication(String state) {
		try {
			return dao.queryApplication(state);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits, String state){ 
			try {
				return dao.queryAllByLimits(page, limits, state);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	 
	 public List<Map<String, Object>> selectApp(String selItem, String selContent, String state){ 
		   try {
				return dao.selectApp(selItem, selContent, state);
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  } 

	 public List<Map<String, Object>> selectAppByLimits(String selItem,String selContent,int pageSize,int currPage, String state){ 
		 try {
				return dao.selectAppByLimits(selItem, selContent, pageSize, currPage, state);
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	
	 public void updateStateToAgree(String id){

		 try {
			   dao.updateStateToAgree(id);
			}
			catch(Exception e){
				e.printStackTrace(); 
			} 
	  }
	 
		public List<Map<String, Object>> queryApplicationByCus(String customerId) {
			try {
				return dao.queryApplicationByCus(customerId);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			
		}
		 public List<Map<String, Object>> queryAllByLimitsByCus(int page, int limits,String customerId){
				try {
					return dao.queryAllByLimitsByCus(page, limits, customerId);
				}
				catch(Exception e){
					e.printStackTrace();
				}
				return null;  
		}
}	
