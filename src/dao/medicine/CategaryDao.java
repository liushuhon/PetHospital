package dao.medicine;

import java.util.List;
import java.util.Map;

import entity.medicine.Categary;
import util.CommonDAO;

public class CategaryDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> queryCategary(){
		 
		try{
			String sql = "select * from med_categary ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllCategary(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from med_categary order by `med_categary`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteCategary(String id) throws Exception{ 
		try {
			String sql = "delete FROM med_categary WHERE id = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateCategary(Categary categary) throws Exception{ 
		try {
			String sql = "update med_categary SET categary = '"+categary.getCategary()+"' WHERE id = '"+categary.getId()+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void addCategary(String categary) throws Exception{ 
		try {
			String sql = "INSERT INTO med_categary(categary) VALUES('"+categary+"')";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectCategary(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM med_categary WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> categarys = this.commonDAO.excuteQuery(sql, null);
			return categarys;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectCategaryByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM med_categary WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> categarys = this.commonDAO.excuteQuery(sql, null);
			return categarys;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
