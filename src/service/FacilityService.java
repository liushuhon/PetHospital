package service;

import java.util.List;
import java.util.Map;

import dao.FacilityDao;
import entity.Facility;

public class FacilityService {
	FacilityDao facilityDao = new FacilityDao();

	public void addFacility(Facility facility){
		facilityDao.addFacility(facility);
	}

	public List<Map<String, Object>> queryAllFacility() {
		return facilityDao.queryAllFacility();
	}

	public List<Map<String, Object>> queryAllByLimits(int page, int limits) {
		return this.facilityDao.queryAllByLimits(page, limits);
	}

	public List<Map<String, Object>> selectFacility(String selItem,
			String selContent) {
		return this.facilityDao.selectFacility(selItem, selContent);
	}

	public List<Map<String, Object>> selectFacilityByLimits(String selItem,
			String selContent, int pageSize, int currPage) {
		return this.facilityDao.selectFacilityByLimits(selItem, selContent,
				pageSize, currPage);
	}

	public void deleteFacility(String code) {
		this.facilityDao.deleteFacility(code);
	}

	public void updateFaci(Facility facility) {
		this.facilityDao.updateFaci(facility);
	}
}
