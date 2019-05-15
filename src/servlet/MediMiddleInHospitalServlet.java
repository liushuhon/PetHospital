package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.AdminService;
import service.MediMiddleInHospitalService;
import service.MediMiddlePrescriService;

import com.alibaba.fastjson.JSON;

import entity.MediMiddleInHospital;
import entity.MediMiddlePrescri;

/**
 * Servlet implementation class MediMiddlePrescriServlet
 */
@WebServlet("/MediMiddleInHospitalServlet")
public class MediMiddleInHospitalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MediMiddleInHospitalServlet() {
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
		MediMiddleInHospitalService service = new MediMiddleInHospitalService();
		if(requestType.equals("addMiddle")){
			String medicineId = request.getParameter("medicineId").toString();
			String number = request.getParameter("number").toString();
			String inHospitalId = request.getParameter("inHospitalId").toString(); 
			MediMiddleInHospital mehoHospital = new MediMiddleInHospital();
			mehoHospital.setInHospitalId(inHospitalId);
			mehoHospital.setMedicineId(medicineId);
			mehoHospital.setNumber(number);
			service.addMedi_Prescri(mehoHospital);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		} else if (requestType.equals("selectByInhospitalId")) {
			String inhospitalId = request.getParameter("inhospitalId");
			List<Map<String, Object>> middles = service.selectByInhospitalId(inhospitalId);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(middles).getBytes("utf-8")); 
		}
	}

}
