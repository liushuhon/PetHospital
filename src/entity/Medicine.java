package entity;

public class Medicine {
	private String medicineCode;
	private String category;
	private String medicineName;
	private String specifications;
	private String manufacturer;
	private double price;
	private double costPrice;
	private String supplier;
	
	public Medicine(String medicineCode, String category, String medicineName,
			String specifications, String manufacturer, double price,
			double costPrice, String supplier) {
		super();
		this.medicineCode = medicineCode;
		this.category = category;
		this.medicineName = medicineName;
		this.specifications = specifications;
		this.manufacturer = manufacturer;
		this.price = price;
		this.costPrice = costPrice;
		this.supplier = supplier;
	}
	public String getMedicineCode() {
		return medicineCode;
	}
	public void setMedicineCode(String medicineCode) {
		this.medicineCode = medicineCode;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getMedicineName() {
		return medicineName;
	}
	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}
	public String getSpecifications() {
		return specifications;
	}
	public void setSpecifications(String specifications) {
		this.specifications = specifications;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public double getCostPrice() {
		return costPrice;
	}
	public void setCostPrice(double costPrice) {
		this.costPrice = costPrice;
	}
	public String getSupplier() {
		return supplier;
	}
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	
}
