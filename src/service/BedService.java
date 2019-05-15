package service;

import java.util.List;
import java.util.Map;

import dao.BedDao;
import entity.Bed;

public class BedService {
	BedDao bedDao = new BedDao();

	public void addBed(Bed bed) {
		bedDao.addBed(bed);
	}

	public List<Map<String, Object>> queryBed() {
		try {
			return bedDao.queryBed();
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}
	public List<Map<String, Object>> queryAllBed(int page, int limit) {
		try {
			return bedDao.queryAllBed(page, limit);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
			return null;
		}
	}

	public void deleteBed(String id) {
		try {
			bedDao.deleteBed(id);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
		}
	}

	public void updateBed(Bed bed) {
		try {
			bedDao.updateBed(bed);
		} catch (Exception e) {
			new Exception("操作数据库出错！").printStackTrace();
		}
	}

	public List<Map<String, Object>> selectBed(String selItem,
			String selContent) {

		try {
			return bedDao.selectBed(selItem, selContent);
		} catch (Exception e) {
			System.out.println("操作数据库出错！");
		}
		return null;
	}

	public List<Map<String, Object>> selectBedByLimits(String selItem,
			String selContent, int pageSize, int currPage) {
		try {
			return bedDao.selectBedByLimits(selItem, selContent, pageSize, currPage);
		} catch (Exception e) {
			System.out.println("操作数据库出错！");
		}
		return null;
	}
	public List<Map<String, Object>> selectFreeBed() {
		try {
			return bedDao.selectFreeBed();
		} catch (Exception e) {
			System.out.println("操作数据库出错！");
		}
		return null;
	}
}
