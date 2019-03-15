package dao;

import java.util.List;
import java.util.Map;

import entity.Medicine;
import util.CommonDAO;

public class MedicineDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> searchByCode(String code) {
		try {
			String sql = "SELECT * FROM medicine where medicineCode='"+code+"'";
			return commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			System.out.println("操作数据库出错！");
			return null;
		}
	}
	public List<Map<String, Object>> searchMedicineName(String medicine) {
		
		try {
			String sql = "SELECT medicine.medicineName FROM medicine WHERE medicineName LIKE '%"+medicine+"%'";
			 List<Map<String, Object>> medicines = this.commonDAO.excuteQuery(sql, null);
			return medicines;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	
	public List<Map<String, Object>> queryMedicine(){
		 
		try{
			String sql = "select * from medicine ";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllMedicine(int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from medicine order by `medicine`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void deleteMedicine(String id) throws Exception{ 
		try {
			String sql = "delete FROM medicine WHERE id = " + id;
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void updateMedicine(Medicine medicine) throws Exception{ 
		try {
			String sql = "update medicine SET category = '"+medicine.getCategory()+"',medicineName = '"+medicine.getMedicineName()+"'"
					+ ",specifications = '"+medicine.getSpecifications()+"',manufacturer = '"+medicine.getManufacturer()+"',price = '"+medicine.getPrice()+"'"
							+ ",costPrice = '"+medicine.getCostPrice()+"',supplier = '"+medicine.getSupplier()+"' WHERE medicineCode = '"+medicine.getMedicineCode()+"'";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public void addMedicine(Medicine medicine) throws Exception{ 
		try {
			String sql = "INSERT INTO medicine(medicineCode,medicineName,specifications,manufacturer,price,costPrice，supplier,category) "
					+ "VALUES('"+medicine.getMedicineCode()+"','"+medicine.getMedicineName()+"','"+medicine.getSpecifications()+"','"+medicine.getManufacturer()+"'"
					+ ",'"+medicine.getPrice()+"''"+medicine.getCostPrice()+"''"+medicine.getSupplier()+"''"+medicine.getCategory()+"')";
			this.commonDAO.executeUpdate(sql, new Object[]{}); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectMedicine(String selItem,String selContent) {
		
		try {
			String sql = "select * FROM medicine WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
			List<Map<String, Object>> medicines = this.commonDAO.excuteQuery(sql, null);
			return medicines;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	public List<Map<String, Object>> selectMedicineByLimits(String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM medicine WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> medicines = this.commonDAO.excuteQuery(sql, null);
			return medicines;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
}
