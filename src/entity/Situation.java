package entity;

public class Situation {
	private String petId;
	private String doctorId;
	private String note;
	private String date;
	private String mark;
	
	
	public Situation() {
		super();
	}
	public Situation(String petId, String doctorId, String note, String date,
			String mark) {
		super();
		this.petId = petId;
		this.doctorId = doctorId;
		this.note = note;
		this.date = date;
		this.mark = mark;
	}
	public String getPetId() {
		return petId;
	}
	public void setPetId(String petId) {
		this.petId = petId;
	}
	public String getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	
	
}
