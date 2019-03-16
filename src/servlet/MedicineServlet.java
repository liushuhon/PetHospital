package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MedicineService;

import com.alibaba.fastjson.JSON;

import dao.DoctorDao;
import dao.MedicineDao;
import entity.Medicine;

/**
 * Servlet implementation class MedicineServlet
 */
@WebServlet("/MedicineServlet")
public class MedicineServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MedicineServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		MedicineDao medicineDao = new MedicineDao();
		MedicineService medicineService = new MedicineService();
		if(requestType.equals("searchMedicineName")){
			String medicine = request.getParameter("medicine").toString();
			List<Map<String,Object>> medicines = medicineService.searchMedicineName(medicine);
			ArrayList<String> medicineName = new ArrayList<String>();
			for (Map<String, Object> map : medicines) {
				medicineName.add(map.get("medicineName").toString());
			} 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(medicineName).getBytes("utf-8")); 
		}else if (requestType.equals("queryAllMedicine")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = medicineDao.queryMedicine().size();
			List<Map<String, Object>> medicines = medicineDao.queryAllMedicine(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", medicines);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteMedicine")) {
			String id = request.getParameter("id");
			medicineService.deleteMedicine(id);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateMedicine")) {
			Medicine medicine = new Medicine();
			medicine.setCategory(request.getParameter("categary").toString());
			medicine.setMedicineCode(request.getParameter("medicineCode").toString());
			medicine.setCostPrice(Double.parseDouble(request.getParameter("costPrice").toString()));
			medicine.setPrice(Double.parseDouble(request.getParameter("price").toString()));
			medicine.setManufacturer(request.getParameter("manufacturer").toString());
			medicine.setMedicineName(request.getParameter("medicineName").toString());
			medicine.setSpecifications(request.getParameter("specifications").toString());
			medicine.setSupplier(request.getParameter("supplier").toString());
			medicineService.updateMedicine(medicine);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("addMedicine")) {
			Medicine medicine = new Medicine();
			medicine.setCategory(request.getParameter("categary").toString()); 
			medicine.setCostPrice(Double.parseDouble(request.getParameter("costPrice").toString()));
			medicine.setPrice(Double.parseDouble(request.getParameter("price").toString()));
			medicine.setManufacturer(request.getParameter("manufacturer").toString());
			medicine.setMedicineName(request.getParameter("medicineName").toString());
			medicine.setSpecifications(request.getParameter("specifications").toString());
			medicine.setSupplier(request.getParameter("supplier").toString());
			String code = getRandomCard();
			while (medicineDao.searchByCode(code).size()==1) {
				code = getRandomCard();
			}
			medicine.setMedicineCode(code);
			medicineService.addMedicine(medicine);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectMedicine")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int cateNum = medicineService.selectMedicine(selItem, selContent).size();
			List<Map<String, Object>> medicines = medicineDao.selectMedicineByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", medicines);
			result.put("count", cateNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		}
		
	}

	public static String getRandomCard() {
		Random rand = new Random();// 生成随机数
		String cardNnumer = "";
		for (int a = 0; a < 6; a++) {
			cardNnumer += rand.nextInt(10);// 生成6位数字
		}
		return cardNnumer;
	}
}
