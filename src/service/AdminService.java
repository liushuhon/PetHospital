package service;

import java.util.List;
import java.util.Map;

import dao.AdminDao;

public class AdminService {
	AdminDao adminDao = new AdminDao();
	public List<Map<String, Object>> findAdminByUsernameAndPassword(String username,String password){
		return adminDao.findAdminByUsernameAndPassword(username, password);
	}
	public List<Map<String, Object>> changePassword(String password, String id) {
		try {
			return adminDao.changePassword(password, id);
		} catch (Exception e) {
			return null;
		}
	}
}
