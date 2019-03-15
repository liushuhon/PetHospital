package dao.medicine;

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.medicine.Specification;;

public class SpecificationDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> querySpeci(){
		 
		try{
			String sql = "select * from med_specification ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllSpeci(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from med_specification order by `med_specification`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteSpeci(String id) throws Exception{ 
		try {
			String sql = "delete FROM med_specification WHERE id = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateSpeci(Specification speci) throws Exception{ 
		try {
			String sql = "update med_specification SET specification = '"+speci.getSpecification()+"' WHERE id = '"+speci.getId()+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void addSpeci(Specification speci) throws Exception{ 
		try {
			String sql = "INSERT INTO med_specification(specification) VALUES('"+speci.getSpecification()+"')";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectSpeci(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM med_specification WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> specis = this.commonDAO.excuteQuery(sql, null);
			return specis;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSpeciByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM med_specification WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> specis = this.commonDAO.excuteQuery(sql, null);
			return specis;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
