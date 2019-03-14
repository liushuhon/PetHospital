package entity;

public class Pet {
	private String petCode;
	private int masterId;
	private int age;
	private String nickname;
	private String gender;
	private String sterilization;
	private String immunity;
	private String species;
	private String Color;
	private String Weight;
	private int Mark;
	private String petName;
 
	public Pet() {
		super();
	} 
	
	public String getPetName() {
		return petName;
	}
  
	public void setPetName(String petName) {
		this.petName = petName;
	} 

	public String getPetCode() {
		return petCode;
	}

	public void setPetCode(String petCode) {
		this.petCode = petCode;
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
		return Weight;
	}
	public void setWeight(String weight) {
		Weight = weight;
	}
	public int getMark() {
		return Mark;
	}
	public void setMark(int mark) {
		Mark = mark;
	}

	
}
