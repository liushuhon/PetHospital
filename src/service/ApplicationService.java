package service;

import dao.ApplicationDao;
import entity.AdoptApplication;

public class ApplicationService {
	ApplicationDao dao = new ApplicationDao();
	public void appApplication(AdoptApplication application){
		dao.addApplication(application);
	}
}
