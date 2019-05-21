package service;

import java.util.List;
import java.util.Map;

import dao.RegistrationDao;
import entity.Registration;

public class RegistrationService {
	RegistrationDao registrationDao = new RegistrationDao();
	/**
	 * 用户的订单
	 * @param doctorId
	 * @param state
	 * @return
	 */
	public List<Map<String, Object>> findRegistrationByCustId(String customerId,String state) {
		return registrationDao.findRegistrationByCustId(customerId, state);
	}
	/***
	 * 用户的分页订单
	 * @param page
	 * @param limits
	 * @return
	 */
	 public List<Map<String, Object>> queryAllByLimitsForCust(String customerId, int page, int limits, String state){
		 return registrationDao.queryAllByLimitsForCust(customerId, page, limits, state);
	 }
	public void updateState(String registrationCode) {
		registrationDao.updateState(registrationCode);
		
	}
	
	public void updateStateAndDate(String registrationCode,String state,String regisTime,String date){
		registrationDao.updateStateAndDate(registrationCode, state, regisTime, date);
	}
	/**
	 * 医生的订单
	 * @param doctorId
	 * @param state
	 * @return
	 */
	public List<Map<String, Object>> findRegistrationByDoctorId(String doctorId,String state) {
		return registrationDao.findRegistrationByDoctorId(doctorId, state);
	}
	/***
	 * 医生的分页订单
	 * @param page
	 * @param limits
	 * @return
	 */
	 public List<Map<String, Object>> queryAllByLimits(String doctorId,int page, int limits, String state){
		 return registrationDao.queryAllByLimits(doctorId,page, limits, state);
	}
	public List<Map<String, Object>> findRegistrationByCode(
			String registrationCode) {
		return registrationDao.findRegistrationByCode(registrationCode);
	}
	public List<Map<String, Object>> selectRegistration(String selItem,
			String doctorId, String selContent, String state) {
		return registrationDao.selectRegistration(selItem, doctorId, selContent, state);
	}
	public List<Map<String, Object>> selectRegistrationByLimit(String selItem,
			String doctorId, String selContent,int pageSize,int currPage, String state) {
		return registrationDao.selectRegistrationByLimit(selItem, doctorId, selContent, pageSize, currPage, state);
	}
	public void addRegistration(Registration registration) {
		 registrationDao.addRegistration(registration);
	}
	public List<Map<String, Object>> findRegistedTime(String doctorId,String date) {
		return registrationDao.findRegistedTime(doctorId, date);
	}
}
