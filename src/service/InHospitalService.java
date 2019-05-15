package service;

import java.util.List;
import java.util.Map;

import dao.InHospitalDao;
import entity.InHospital;

public class InHospitalService {
	InHospitalDao iDao = new InHospitalDao();
	public void addInHospital(InHospital inHospital){ 
		iDao.addInHospital(inHospital);
	}
	public List<Map<String, Object>> queryInHospitalByDoc(String doctorId,String mark){
		return iDao.queryInHospitalByDoc(doctorId, mark);
	}
	public List<Map<String, Object>> queryAllInHospitalByDoc(String doctorId,String mark,int page, int limits){
		return iDao.queryAllInHospitalByDoc(doctorId, mark, page, limits);
	}
	public void updateInHospital(String petId,String mark){ 
		iDao.updateInHospital(petId, mark);
	}
	public List<Map<String, Object>> queryInHospitalByCusId(String customerId,String mark){
		return iDao.queryInHospitalByCusId(customerId, mark);
	}
	public List<Map<String, Object>> queryAllInHospitalByCusId(String customerId,String mark,int page, int limits){
		return iDao.queryAllInHospitalByCusId(customerId, mark, page, limits);
	}
	public List<Map<String, Object>> selectInHospitalByDoc(String doctorId,String mark,String selItem,String selContent) {
		return iDao.selectInHospitalByDoc(doctorId, mark, selItem, selContent);
	}
	
	public List<Map<String, Object>> selectInHospitalByLimits(String doctorId,String mark,String selItem,String selContent,int pageSize,int currPage) {
		return iDao.selectInHospitalByLimits(doctorId, mark, selItem, selContent, pageSize, currPage);
	}
	
	public List<Map<String, Object>> selectInHospitalById(String id) {
		return iDao.selectInHospitalById(id);
	}
	public void updatePrice(String id,String newPrice) { 
		iDao.updatePrice(id, newPrice);
	}
	public List<Map<String, Object>> selectInHospitalByPetId(String petId) {
		return iDao.selectInHospitalByPetId(petId);
	}
	
}
