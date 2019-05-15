package entity;

public class Bed {
	private String bedCode;
	private String petId;
	private String state;
	
	
	public Bed() {
		super();
	}
	public Bed(String bedCode, String petId, String state) {
		super();
		this.bedCode = bedCode;
		this.petId = petId;
		this.state = state;
	}
	public String getBedCode() {
		return bedCode;
	}
	public void setBedCode(String bedCode) {
		this.bedCode = bedCode;
	}
	public String getPetId() {
		return petId;
	}
	public void setPetId(String petId) {
		this.petId = petId;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	
	
}
