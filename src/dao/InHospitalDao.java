package dao;

import java.util.List;
import java.util.Map;

import util.CommonDAO;
import entity.InHospital;

public class InHospitalDao {
	CommonDAO commonDAO = new CommonDAO();

	public void addInHospital(InHospital inHospital){ 
		try {
			String sql = "INSERT INTO InHospital(customerId,petId,bedId,doctorId,stayDays,hospitalPrice,mark,petName,docName,cusName,advancePay) "
					+ "VALUES('"+inHospital.getCustomerId()+"','"+inHospital.getPetId()+"','"+inHospital.getBedId()
					+"','"+inHospital.getDoctorId()+"','"+inHospital.getStayDays()+"','"+inHospital.getHospitalPrice()+"','"+inHospital.getMark()+"','"
					+inHospital.getPetName()+"','"+inHospital.getDocName()+"','"+inHospital.getCusName()+"','"+inHospital.getAdvancePay()+"')";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	public List<Map<String, Object>> queryInHospitalByCusId(String customerId,String mark){
		try{
			String sql = "select * from inHospital where mark = '"+mark+"' and customerId = '"+customerId+"'";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllInHospitalByCusId(String customerId,String mark,int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from inHospital where mark = '"+mark+"' and customerId = '"+customerId+"'"
					+ " order by `inHospital`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public List<Map<String, Object>> queryInHospitalByDoc(String doctorId,String mark){
		 
		try{
			String sql = "select * from inHospital where mark = '"+mark+"' and doctorId = '"+doctorId+"'";
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public List<Map<String, Object>> queryAllInHospitalByDoc(String doctorId,String mark,int page, int limits){
		
		int startIndex = (page - 1) * limits;
		try{
			String sql = "select * from inHospital where mark = '"+mark+"' and doctorId = '"+doctorId+"'"
					+ " order by `inHospital`.id desc limit "+ startIndex +"," + limits;
			return this.commonDAO.excuteQuery(sql, null);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public void updateInHospital(String petId,String mark) { 
		try {
			String sql = "update inHospital set mark = '" + mark + "' where petId = '"+petId+"'";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	public List<Map<String, Object>> selectInHospitalByDoc(String doctorId,String mark,String selItem,String selContent) {
		
		try {
			String sql = "select * FROM inHospital WHERE "+selItem+" like '%"+selContent+"%' and mark = '"+mark+"' and doctorId = '"+doctorId+"' order by id DESC";
			List<Map<String, Object>> inHospitals = this.commonDAO.excuteQuery(sql, null);
			return inHospitals;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public List<Map<String, Object>> selectInHospitalByLimits(String doctorId,String mark,String selItem,String selContent,int pageSize,int currPage) {
		int startIndex = (currPage - 1) * pageSize;
		try {
			String sql = "select * FROM inHospital WHERE "+selItem+" like '%"+selContent+"%' and mark = '"+mark+"' and doctorId = '"+doctorId+"' order by id DESC limit "+startIndex+","+pageSize;
			List<Map<String, Object>> inHospitals = this.commonDAO.excuteQuery(sql, null);
			return inHospitals;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public List<Map<String, Object>> selectInHospitalById(String id) {
		
		try {
			String sql = "select * FROM inHospital WHERE id = " + id;
			List<Map<String, Object>> inHospitals = this.commonDAO.excuteQuery(sql, null);
			return inHospitals;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public List<Map<String, Object>> selectInHospitalByPetId(String petId) {
		
		try {
			String sql = "select * FROM inHospital WHERE petId = " + petId;
			List<Map<String, Object>> inHospitals = this.commonDAO.excuteQuery(sql, null);
			return inHospitals;
		}
		catch(Exception e){
			System.out.println("操作数据库出错！");
		}
		return null; 
	}
	
	public void updatePrice(String id,String newPrice) { 
		try {
			String sql = "update inHospital set hospitalPrice = " + newPrice + " where id = "+id;
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
}
