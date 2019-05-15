package dao;

import java.util.List;
import java.util.Map;

import entity.MediMiddlePrescri;
import util.CommonDAO;

public class MediMiddlePescriDao {
	CommonDAO commonDAO = new CommonDAO();
	public void addMedi_Prescri(MediMiddlePrescri mePrescri){
		 
		   try {
				String sql = "insert into med_prescrip (medicineId,prescriptionId,number) "
						+ "values('"+mePrescri.getMedicineId()+"','"+mePrescri.getPrescriptionId()+"','"+mePrescri.getNumber()+"');";
				
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
	public List<Map<String, Object>> SelectByMark(String customerId,String mark){
		 
		   try {
				String sql = "SELECT * FROM med_prescrip WHERE mark = '"+mark+"' AND customerId = '"+customerId+"'";
				return this.commonDAO.excuteQuery(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	public void updateMarkTo1(String customerId){
		 
		   try {
				String sql = "update  med_prescrip SET  mark = 1 where  customerId =" + customerId;
				
				this.commonDAO.executeUpdate(sql, null); 
			}
			catch(Exception e){
				e.printStackTrace();
			} 
	  }
}
