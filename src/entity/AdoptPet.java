package entity;

public class AdoptPet {
	private String adoptPetCode;
	private int masterId;
	private int age;
	private String nickname;
	private String gender;
	private String sterilization;
	private String immunity;
	private String species;
	private String Color;
	private String weight;  
	private String photo;
	
	
	public AdoptPet() {
		super();
	}
	public AdoptPet(String adoptPetCode, int masterId, int age,
			String nickname, String gender, String sterilization,
			String immunity, String species, String color, String weight,
			String photo) {
		super();
		this.adoptPetCode = adoptPetCode;
		this.masterId = masterId;
		this.age = age;
		this.nickname = nickname;
		this.gender = gender;
		this.sterilization = sterilization;
		this.immunity = immunity;
		this.species = species;
		this.Color = color;
		this.weight = weight;
		this.photo = photo;
	}

	public String getAdoptPetCode() {
		return adoptPetCode;
	}
	public void setAdoptPetCode(String adoptPetCode) {
		this.adoptPetCode = adoptPetCode;
	}
	public int getMasterId() {
		return masterId;
	}
	public void setMasterId(int masterId) {
		this.masterId = masterId;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getSterilization() {
		return sterilization;
	}
	public void setSterilization(String sterilization) {
		this.sterilization = sterilization;
	}
	public String getImmunity() {
		return immunity;
	}
	public void setImmunity(String immunity) {
		this.immunity = immunity;
	}
	public String getSpecies() {
		return species;
	}
	public void setSpecies(String species) {
		this.species = species;
	}
	public String getColor() {
		return Color;
	}
	public void setColor(String color) {
		Color = color;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
 
}
