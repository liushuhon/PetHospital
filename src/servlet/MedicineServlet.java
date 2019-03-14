package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.MedicineService;

import com.alibaba.fastjson.JSON;

import dao.DoctorDao;
import dao.MedicineDao;

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
		}
	}

}
