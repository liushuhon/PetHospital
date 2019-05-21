package dao;

import java.util.List;
import java.util.Map;

import util.Common;
import util.CommonDAO;

public class AdoptApplicationDao {
	CommonDAO commonDAO = new CommonDAO();
	Common common = new Common();
	public void addApplication(String petCode, String userCode) {
		try {
			String sql = "insert into adoptapplication(customerId,adoptPetId,date,appstate) values('"+userCode+"','"+petCode+"','"+common.getNow()+"','待处理')";
			commonDAO.executeUpdate(sql, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	public List<Map<String, Object>> queryApplication(String state) {
		try {
			String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,p.adoptPetCode,p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a , customer c ,adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode and a.appstate ='"+state+"' ORDER BY a.date desc";
			return commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits, String state){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,p.adoptPetCode,p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a , customer c ,adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode and a.appstate ='"+state+"' ORDER BY a.date desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	 
	 public List<Map<String, Object>> selectApp(String selItem, String selContent, String state){ 
		   try {
			   String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,p.adoptPetCode,p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a , customer c ,adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode  and "+selItem+" like '%"+selContent+"%' and a.appstate = '"+state+"' order by a.date DESC";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  } 

	 public List<Map<String, Object>> selectAppByLimits(String selItem,String selContent,int pageSize,int currPage, String state){ 
		 int startIndex = (currPage - 1) * pageSize; 
		 try {
			   String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,p.adoptPetCode,p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a , customer c ,adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode  and "+selItem+" like '%"+selContent+"%' and a.appstate = '"+state+"' order by a.date DESC limit " +startIndex+","+pageSize;
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 
	 public void updateStateToAgree(String id){

		 try {
			   String sql = "UPDATE adoptapplication SET appstate='同意' where id = "+id+"";
			   this.commonDAO.executeUpdate(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace(); 
			} 
	  }
	 
		public List<Map<String, Object>> queryApplicationByCus(String customerId) {
			try {
				String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,p.adoptPetCode,"
						+ "p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a , customer c ,"
						+ "adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode  "
								+ "and c.customerCode = '"+customerId+"' ORDER BY a.date desc";
				return commonDAO.excuteQuery(sql, null);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			
		}
		 public List<Map<String, Object>> queryAllByLimitsByCus(int page, int limits,String customerId){
			 int startIndex = (page - 1) * limits;
				try {
					String sql = "select a.*,c.userName,c.phone,c.customerCode,c.photo,c.gender as cusPhoto,p.nickname,p.species,p.gender,"
							+ "p.adoptPetCode,p.state,p.immunity,p.sterilization,p.weight,p.age,p.color,p.photo as petPhoto from adoptapplication a ,"
							+ " customer c ,adoptpet p  WHERE a.adoptPetId = p.adoptPetCode and  a.customerId = c.customerCode  "
									+ " and c.customerCode = '"+customerId+"' ORDER BY a.date desc limit " + startIndex + "," + limits;
					return this.commonDAO.excuteQuery(sql, null);
				}
				catch(Exception e){
					e.printStackTrace();
				}
				return null;  
		}
}
