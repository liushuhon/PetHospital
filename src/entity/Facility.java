package entity;

public class Facility {
	private String faciCode;
	private String faciName;
	private String origin;
	private String faciDescribe;
	private String state;
	private String photo;
	
	public Facility() {
		super();
	}

	public Facility(String faciCode, String faciName, String origin,
			String faciDescribe,String state,String photo) {
		super();
		this.faciCode = faciCode;
		this.faciName = faciName;
		this.origin = origin;
		this.faciDescribe = faciDescribe;
		this.state = state;
		this.photo = photo;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getFaciCode() {
		return faciCode;
	}

	public void setFaciCode(String faciCode) {
		this.faciCode = faciCode;
	}

	public String getFaciName() {
		return faciName;
	}

	public void setFaciName(String faciName) {
		this.faciName = faciName;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getFaciDescribe() {
		return faciDescribe;
	}

	public void setFaciDescribe(String faciDescribe) {
		this.faciDescribe = faciDescribe;
	}
	
}
