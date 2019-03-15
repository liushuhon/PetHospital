package dao.medicine;

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.medicine.Supplier;;

public class SupplierDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> querySupplier(){
		 
		try{
			String sql = "select * from med_supplier ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllSupplier(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from med_supplier order by `med_supplier`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteSupplier(String id) throws Exception{ 
		try {
			String sql = "delete FROM med_supplier WHERE id = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateSupplier(Supplier supplier) throws Exception{ 
		try {
			String sql = "update med_supplier SET tel = '"+supplier.getTel()+"',supplier = '"+supplier.getSupplier()+"' WHERE id = '"+supplier.getId()+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void addSupplier(Supplier supplier) throws Exception{ 
		try {
			String sql = "INSERT INTO med_supplier(supplier,tel) VALUES('"+supplier.getSupplier()+"','"+supplier.getTel()+"')";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectSupplier(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM med_supplier WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> suppliers = this.commonDAO.excuteQuery(sql, null);
			return suppliers;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectSupplierByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM med_supplier WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> suppliers = this.commonDAO.excuteQuery(sql, null);
			return suppliers;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
