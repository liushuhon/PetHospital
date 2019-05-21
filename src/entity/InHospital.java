package entity;

public class InHospital {
	private String customerId;
	private String petId;
	private String bedId;
	private String doctorId;
	private Double hospitalPrice;
	private String mark;
	private int stayDays;
	private String petName;
	private String docName;
	private String cusName;
	private Double advancePay;
	
	public InHospital() {
		super();
	}
	
	public InHospital(String customerId, String petId, String bedId,
			String doctorId, Double hospitalPrice, String mark, int stayDays,
			String petName, String docName, String cusName, Double advancePay) {
		super();
		this.customerId = customerId;
		this.petId = petId;
		this.bedId = bedId;
		this.doctorId = doctorId;
		this.hospitalPrice = hospitalPrice;
		this.mark = mark;
		this.stayDays = stayDays;
		this.petName = petName;
		this.docName = docName;
		this.cusName = cusName;
		this.advancePay = advancePay;
	}
	

	public Double getAdvancePay() {
		return advancePay;
	}

	public void setAdvancePay(Double advancePay) {
		this.advancePay = advancePay;
	}

	public String getPetName() {
		return petName;
	}

	public void setPetName(String petName) {
		this.petName = petName;
	}

	public String getDocName() {
		return docName;
	}

	public void setDocName(String docName) {
		this.docName = docName;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getPetId() {
		return petId;
	}
	public void setPetId(String petId) {
		this.petId = petId;
	}
	public String getBedId() {
		return bedId;
	}
	public void setBedId(String bedId) {
		this.bedId = bedId;
	}
	public Double getHospitalPrice() {
		return hospitalPrice;
	}
	public void setHospitalPrice(Double hospitalPrice) {
		this.hospitalPrice = hospitalPrice;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public int getStayDays() {
		return stayDays;
	}
	public void setStayDays(int stayDays) {
		this.stayDays = stayDays;
	}
	
	
}
