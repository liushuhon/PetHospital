package entity;

public class MediMiddlePrescri {
	private String prescriptionId;
	private String medicineId;
	private String number;
	
	public MediMiddlePrescri() {
		super();
	}
	
	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getMedicineId() {
		return medicineId;
	}

	public void setMedicineId(String medicineId) {
		this.medicineId = medicineId;
	} 

	public String getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(String prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	
	
}
