package service;

import java.util.List;
import java.util.Map;

import dao.MediMiddleInHospitalDao;
import entity.MediMiddleInHospital;;

public class MediMiddleInHospitalService {
	MediMiddleInHospitalDao medao = new MediMiddleInHospitalDao();
	public void addMedi_Prescri(MediMiddleInHospital meHospital){
		medao.addMedi_InHospital(meHospital);
	}
	public List<Map<String, Object>>  selectByInhospitalId(String inhospitalId){
		return medao.selectByInhospitalId(inhospitalId);
	}
}
