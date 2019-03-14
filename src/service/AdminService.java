package service;

import java.util.List;
import java.util.Map;

import dao.AdminDao;

public class AdminService {
	AdminDao adminDao = new AdminDao();
	public List<Map<String, Object>> findAdminByUsernameAndPassword(String username,String password){
		return adminDao.findAdminByUsernameAndPassword(username, password);
	}
}
