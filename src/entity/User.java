package entity;

public class User {
	private String userId;
	private String username;
	private String password;
	private String pohoto; 
	private String photo;
	public User() {
		super();
	}
	
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getPohoto() {
		return pohoto;
	}

	public void setPohoto(String pohoto) {
		this.pohoto = pohoto;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
