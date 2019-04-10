package entity;

public class AdoptApplication {
	private String customerId;
	private String adoptPetId;
	private String appstate;
	private String date;
	
	
	public AdoptApplication() {
		super();
	}
	
	public AdoptApplication(String customerId, String adoptPetId, String state,
			String date) {
		super();
		this.customerId = customerId;
		this.adoptPetId = adoptPetId;
		this.appstate = state;
		this.date = date;
	}

	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getAdoptPetId() {
		return adoptPetId;
	}
	public void setAdoptPetId(String adoptPetId) {
		this.adoptPetId = adoptPetId;
	}
	public String getState() {
		return appstate;
	}
	public void setState(String state) {
		this.appstate = state;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
}
