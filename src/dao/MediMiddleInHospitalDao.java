package dao;

import java.util.List;
import java.util.Map;

import entity.MediMiddleInHospital;
import util.CommonDAO;

public class MediMiddleInHospitalDao {
	CommonDAO commonDAO = new CommonDAO();
	public void addMedi_InHospital(MediMiddleInHospital meHospital){
		 
		   try {
				String sql = "insert into med_inhospital (medicineId,inhospitalId,number) "
						+ "values('"+meHospital.getMedicineId()+"','"+meHospital.getInHospitalId()+"','"+meHospital.getNumber()+"');";
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> selectByInhospitalId(String inhospitalId){
		 
		   try {
				String sql = "SELECT * FROM med_inhospital WHERE inhospitalId = '"+inhospitalId+"'";
				return this.commonDAO.excuteQuery(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
}
