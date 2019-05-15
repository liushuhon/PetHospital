package service;

import java.util.List;
import java.util.Map;

import dao.SituationDao;
import entity.Situation;

public class SituationService {
	SituationDao dao = new SituationDao();
	public void addSituation(Situation situation){ 
		try {
			dao.addSituation(situation);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	public List<Map<String, Object>> querySituation(){
		 
		try{
			return dao.querySituation();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllSituation(int page, int limits){
		
		try{
			return dao.queryAllSituation(page, limits);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public void updateSituation(String petId){ 
		try {
			dao.updateSituation(petId);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
public List<Map<String, Object>> selectSituation(String selItem,String selContent) {
		
		try {
			return dao.selectSituation(selItem, selContent);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSituationByLimits(String selItem,String selContent,int pageSize,int currPage) {
		try {
			return dao.selectSituationByLimits(selItem, selContent, pageSize, currPage);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSituationByPetId(String petId,String mark) {
		
		try {
			return dao.selectSituationByPetId(petId,mark);
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
