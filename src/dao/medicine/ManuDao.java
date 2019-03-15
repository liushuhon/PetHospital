package dao.medicine;

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.medicine.Manufacture;;

public class ManuDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> queryManu(){
		 
		try{
			String sql = "select * from med_manufacture ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllManu(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from med_manufacture order by `med_manufacture`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteManu(String id) throws Exception{ 
		try {
			String sql = "delete FROM med_manufacture WHERE id = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateManu(Manufacture manu) throws Exception{ 
		try {
			String sql = "update med_manufacture SET tel = '"+manu.getTel()+"',manufacture = '"+manu.getManufacture()+"' WHERE id = '"+manu.getId()+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void addManu(Manufacture manu) throws Exception{ 
		try {
			String sql = "INSERT INTO med_manufacture(manufacture,tel) VALUES('"+manu.getManufacture()+"','"+manu.getTel()+"')";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectManu(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM med_manufacture WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> categarys = this.commonDAO.excuteQuery(sql, null);
			return categarys;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectManuByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM med_manufacture WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> categarys = this.commonDAO.excuteQuery(sql, null);
			return categarys;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
