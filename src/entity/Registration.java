package entity;
/*
 * ¹ÒºÅµ¥
 */
public class Registration {
	private String registrationCode;
	private int customerId;
	private int doctorId;
	private int petId;
	private String customerName;
	private String customerPhone;
	private String doctorName;
	private String category;
	private String petName;
	private String date;
    private String state;
	private String regisTime;
	
	public Registration() {
		super();
	}  
	
	public Registration(String registrationCode, int customerId, int doctorId,
			int petId, String customerName, String customerPhone,
			String doctorName, String category, String petName, String date,
			String state, String regisTime) {
		super();
		this.registrationCode = registrationCode;
		this.customerId = customerId;
		this.doctorId = doctorId;
		this.petId = petId;
		this.customerName = customerName;
		this.customerPhone = customerPhone;
		this.doctorName = doctorName;
		this.category = category;
		this.petName = petName;
		this.date = date;
		this.state = state;
		this.regisTime = regisTime;
	} 
	
	public String getRegisTime() {
		return regisTime;
	} 

	public void setRegisTime(String regisTime) {
		this.regisTime = regisTime;
	} 

	public String getPetName() {
		return petName;
	} 

	public void setPetName(String petName) {
		this.petName = petName;
	} 

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getRegistrationCode() {
		return registrationCode;
	}
	public void setRegistrationCode(String registrationCode) {
		this.registrationCode = registrationCode;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public int getPetId() {
		return petId;
	}
	public void setPetId(int petId) {
		this.petId = petId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerPhone() {
		return customerPhone;
	}
	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	public String getDoctorName() {
		return doctorName;
	}
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
