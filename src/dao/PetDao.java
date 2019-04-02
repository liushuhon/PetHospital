package dao;

import java.util.List;
import java.util.Map;

import entity.Pet;
import util.CommonDAO;

public class PetDao {
	CommonDAO commonDAO = new CommonDAO();

	public List<Map<String, Object>> queryAllPets() {

		String sql = "SELECT * FROM pet  JOIN customer WHERE pet.masterid = customer.customerCode";
		try {
			return commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
		}
		return null; 
	}
	 public List<Map<String, Object>> queryAllByLimits(int page, int limits){
		 int startIndex = (page - 1) * limits;
			try {
				String sql = "SELECT * FROM pet order by id desc limit " + startIndex + "," + limits;
				return this.commonDAO.excuteQuery(sql, null);
			}
			catch(Exception e){
				e.printStackTrace();
			}
			return null;  
	}
	 public List<Map<String, Object>> selectPet(String selItem, String selContent){ 
		   try {
			   String sql = "select * FROM pet WHERE "+selItem+" like '%"+selContent+"%' order by id DESC";
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	 

	 
	 public List<Map<String, Object>> selectPetByLimits(String selItem,String selContent,int pageSize,int currPage){ 
		 int startIndex = (currPage - 1) * pageSize; 
		 try {
			   String sql = "select * FROM pet WHERE "+selItem+" like '%"+selContent+"%' order by id DESC limit " +startIndex+","+pageSize;
				
				return this.commonDAO.excuteQuery(sql, null); 
				 
			}
			catch(Exception e){
				e.printStackTrace();
				return null;
			} 
	  }
	public List<Map<String, Object>> queryByCusId(String customerCode) {

		String sql = "SELECT * FROM pet  JOIN customer WHERE pet.masterid = customer.customerCode and customer.customerCode = '" + customerCode+"'";
		try {
			return commonDAO.excuteQuery(sql, null);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
		}
		return null; 
	}
	public void addPet(Pet pet) {

		String sql = "insert into pet (masterid,age,nickname,gender,sterilization,immunity,species,color,weight,petCode,petImg)"
						+ "values('"+pet.getMasterId()+"','"+pet.getAge()+"','"+pet.getNickname()+"','"+pet.getGender()+"'"
								+ ",'"+pet.getSterilization()+"','"+pet.getImmunity()+"','"+pet.getSpecies()+"','"+pet.getColor()+"','"+pet.getWeight()+"','"+pet.getPetCode()+"','"+pet.getPetImg()+"');";
		try {
			commonDAO.executeUpdate(sql, null);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
		} 

	}
}
