package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;

public class FacilityDao {
	CommonDAO commonDAO = new CommonDAO();
	
	public List<Map<String, Object>> queryAllFacility(){
		String sql = "select * from facility order by id DESC";
		try {
			return this.commonDAO.excuteQuery(sql, null);
			
		} catch (Exception e) {
			return null;
		}
	}
}
