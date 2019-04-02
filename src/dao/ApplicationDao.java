package dao;

import java.util.List;
import java.util.Map;

import entity.AdoptApplication;
import util.CommonDAO;

public class ApplicationDao {
	CommonDAO commonDAO = new CommonDAO();
	public void addApplication(AdoptApplication application){
		try {
			String sql = "insert into adoptApplication(customerid,adoptpetid,date,state) values('"+application.getCustomerId()+"','"+application.getAdoptPetId()+"','"+application.getDate()+"','"+application.getState()+"')";
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
