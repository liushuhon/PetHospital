package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;

public class PetDao {
	CommonDAO commonDAO = new CommonDAO();
	public List<Map<String, Object>> queryAllPets(){
		
		String sql = "SELECT * FROM pet  JOIN customer WHERE pet.masterid = customer.customerCode";
		try {
			return commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();	
		}
		return null;
		
	}
}
