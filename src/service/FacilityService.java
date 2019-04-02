package service;

import java.util.List;
import java.util.Map;

import dao.FacilityDao;

public class FacilityService {
	FacilityDao facilityDao = new FacilityDao();
	public List<Map<String, Object>> queryAllFacility(){
		return facilityDao.queryAllFacility();
	}
}
