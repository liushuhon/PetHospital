package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;

public class MedicineDao {
	CommonDAO commonDAO = new CommonDAO();
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
}
