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
			new Exception("操作数据库出错！").printStackTrace();;
		}
		return null;
	 }
	 public List<Map<String, Object>> changePassword(String password,String id) {  
		 
			try {
				String sql = "update administor set password='" + password +  "'"+"where id='" + id+"'" ;
						this.commonDAO.executeUpdate(sql, null);
				System.out.print(sql);
			}
			catch(Exception e){
				new Exception("操作数据库出错！").printStackTrace();;
			}
			return null;
		}
}
