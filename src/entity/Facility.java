package entity;

public class Facility {
	private String faciCode;
	private String faciName;
	private String origin;
	private String faciDescribe;
	private String stockNum;
	private String total; 
	
	public Facility() {
		super();
	}

	public Facility(String faciCode, String faciName, String origin,
			String faciDescribe, String stockNum, String total) {
		super();
		this.faciCode = faciCode;
		this.faciName = faciName;
		this.origin = origin;
		this.faciDescribe = faciDescribe;
		this.stockNum = stockNum;
		this.total = total;
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

	public String getStockNum() {
		return stockNum;
	}

	public void setStockNum(String stockNum) {
		this.stockNum = stockNum;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}
	
}
