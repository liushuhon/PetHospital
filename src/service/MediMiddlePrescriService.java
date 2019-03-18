package service;

import java.util.List;
import java.util.Map;

import dao.MediMiddlePescriDao;
import entity.MediMiddlePrescri;

public class MediMiddlePrescriService {
	MediMiddlePescriDao medao = new MediMiddlePescriDao();
	public void addMedi_Prescri(MediMiddlePrescri mePrescri){
		medao.addMedi_Prescri(mePrescri);
	}
	public List<Map<String, Object>> selectByMark(String customerId,String mark){
		return medao.SelectByMark(customerId, mark);
	}
	public void updateMarkTo1(String customerId){
		medao.updateMarkTo1(customerId);
	}
}
