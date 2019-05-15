package dao;

import java.util.List;
import java.util.Map;

import entity.Situation;
import util.CommonDAO;

public class SituationDao {
	CommonDAO commonDAO = new CommonDAO();

	public void addSituation(Situation situation){ 
		try {
			String sql = "INSERT INTO situation(petId,doctorId,note,mark,date) "
					+ "VALUES('"+situation.getPetId()+"','"+situation.getDoctorId()+"','"+situation.getNote()+"'"
							+ ",'"+situation.getMark()+"','"+situation.getDate()+"')";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	public List<Map<String, Object>> querySituation(){
		 
		try{
			String sql = "select * from situation ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllSituation(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from situation order by `situation`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public void updateSituation(String petId){ 
		try {
			String sql = "update situation SET mark = '出院' WHERE petId = '"+petId+"' and mark = '住院'";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	public List<Map<String, Object>> selectSituation(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM situation WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> situations = this.commonDAO.excuteQuery(sql, null);
			return situations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSituationByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM situation WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> situations = this.commonDAO.excuteQuery(sql, null);
			return situations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSituationByPetId(String petId,String mark) {
		
		try {
			String sql = "select * FROM situation WHERE petId = '"+petId+"' and mark='"+mark+"' order by date DESC";
			List<Map<String, Object>> situations = this.commonDAO.excuteQuery(sql, null);
			return situations;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
