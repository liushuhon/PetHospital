package dao;

import java.util.List;
import java.util.Map;
 
import util.CommonDAO;
import entity.Administor;

public class AdminDao {
	 Administor administor = new Administor();
	 CommonDAO commonDAO = new CommonDAO();
	 public List<Map<String, Object>> findAdminByUsernameAndPassword(String username,String password){
	 try {
			String sql = "select * from  administor where username='" + username + "' and password = '" + password + "'";
			List<Map<String, Object>> admin = this.commonDAO.excuteQuery(sql, null);
			return admin;
		}
		catch(Exception e){
			new Exception("�������ݿ������").printStackTrace();;
		}
		return null;
	 }
 
}