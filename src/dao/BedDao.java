package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.Bed;

public class BedDao {
	CommonDAO commonDAO = new CommonDAO();

	public void addBed(Bed bed){ 
		try {
			String sql = "INSERT INTO bed(bedCode,state,petId) "
					+ "VALUES('"+bed.getBedCode()+"','"+bed.getState()+"',"+bed.getPetId()+")";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	public List<Map<String, Object>> queryBed(){
		 
		try{
			String sql = "select * from bed ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllBed(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from bed order by `bed`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteBed(String id) throws Exception{ 
		try {
			String sql = "delete FROM bed WHERE petCode = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateBed(Bed bed) throws Exception{
		try {
			String sql = "update bed SET state = '"+bed.getState()+"',petId ="+bed.getPetId()+" WHERE bedCode = '"+bed.getBedCode()+"'";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectBed(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM bed WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> beds = this.commonDAO.excuteQuery(sql, null);
			return beds;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public List<Map<String, Object>> selectBedByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM bed WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> beds = this.commonDAO.excuteQuery(sql, null);
			return beds;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
public List<Map<String, Object>> selectFreeBed() {
		
		try {
			String sql = "select * FROM bed WHERE state = '空闲' order by id DESC";
			List<Map<String, Object>> beds = this.commonDAO.excuteQuery(sql, null);
			return beds;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
