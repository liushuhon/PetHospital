package dao;

import java.util.List;
import java.util.Map;

import entity.AdoptPet;
import entity.Facility;
import util.CommonDAO;

public class FacilityDao {
	CommonDAO commonDAO = new CommonDAO();

	public void addFacility(Facility facility){ 
		try {
			String sql = "INSERT INTO facility(faciCode,faciName,faciDescribe,origin,state,photo) "
					+ "VALUES('"+facility.getFaciCode()+"','"+facility.getFaciName()+"','"+facility.getFaciDescribe()+"','"+facility.getOrigin()+"','"+facility.getState()+"','"+facility.getPhoto()+"')";
			this.commonDAO.executeUpdate(sql, null); 
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace(); 
		}
	}
	
	/***
	 * 管理员或用户查询所有设施
	 * @param state
	 * @return
	 */
	public List<Map<String, Object>> queryAllFacility(){
		String sql = "select * from facility order by id DESC";
		try {
			return this.commonDAO.excuteQuery(sql, null);
			
		} catch (Exception e) {
			return null;
		}
	}
	
	/***
	 * 管理员分页查询所有设施
	 * @param page
	 * @param limits
	 * @param state
	 * @return
	 */
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "SELECT * FROM facility order by id desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	 /***
	  * 管理员
	  * @param selItem
	  * @param selContent
	  * @param state
	  * @return
	  */
	 public List<Map<String, Object>> selectFacility(String selItem, String selContent){ 
		   try {
			   String sql = "select * FROM facility WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  } 
 /***
  * 管理员
  * @param selItem
  * @param selContent
  * @param pageSize
  * @param currPage
  * @param state
  * @return
  */
	 public List<Map<String, Object>> selectFacilityByLimits(String selItem,String selContent,int pageSize,int currPage){ 
		 int startIndex = (currPage - 1) * pageSize; 
		 try {
			   String sql = "select * FROM facility WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit " +startIndex+","+pageSize;
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 
	 public void deleteFacility(String code){ 
		  
		 try {
			 String sql = "delete from facility where faciCode ='" +code+ "'"; 
			 this.commonDAO.executeUpdate(sql, null);  
			}
			catch(Exception e){
				e.printStackTrace(); 
			} 
	  }
	 public void updateFaci(Facility facility){ 
		  
		 try {
			 String sql = "UPDATE facility SET state='"+facility.getState()+"',faciName='"+facility.getFaciName()+"',"
			 		+ "faciDescribe='"+facility.getFaciDescribe()+"',origin='"+facility.getOrigin()+"',photo='"+facility.getPhoto()+"' where faciCode = "+facility.getFaciCode()+""; 
			 this.commonDAO.executeUpdate(sql, null);  
			}
			catch(Exception e){
				e.printStackTrace(); 
			} 
	  }
}
