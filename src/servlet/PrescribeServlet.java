package servlet;

import java.io.IOException;
import java.io.OutputStream; 
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.spi.RegisterableService;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
 











import service.MediMiddlePrescriService;
import service.PrescribeService;
import service.RegistrationService;

import com.alibaba.fastjson.JSON;

import dao.PrescriptionDao;
import dao.RegistrationDao;
import entity.Prescription; 

/**
 * Servlet implementation class PrescribeServlet
 */
@WebServlet("/PrescribeServlet")
public class PrescribeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	 
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PrescribeServlet() {
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
		String requestType = request.getParameter("types");  
		PrescriptionDao pDao = new PrescriptionDao();
		PrescribeService prescribeService = new PrescribeService();
		RegistrationService registerableService = new RegistrationService();
		MediMiddlePrescriService service = new MediMiddlePrescriService();
		if (requestType.equals("addPrescribe")) {
			Double totalPrice = Double.parseDouble(request.getParameter("totalPrice").toString());
			String note = request.getParameter("note");
			Date time = new Date(); 
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String date = sdf.format(time);
			String ss = (new Date()).getTime()+"";
			String prescriptionCode = ss.substring(ss.length()-10, ss.length());
			Prescription prescription = new Prescription();
			prescription.setCustomerId(Integer.parseInt(request.getParameter("customerId")));
			prescription.setPetId(Integer.parseInt(request.getParameter("petId")));
			prescription.setDoctorId(Integer.parseInt(request.getParameter("doctorId")));
			prescription.setMedicines(request.getParameter("medicines"));
			prescription.setPrescriptionCode(prescriptionCode);
			prescription.setSymptom(request.getParameter("symptom")); 
			prescription.setDate(date);
			prescription.setNote(note);
			prescription.setTotalPrice(totalPrice);
			pDao.addPrescription(prescription); 
			registerableService.updateState(request.getParameter("registrationCode"));
//			service.updateMarkTo1(request.getParameter("customerId")); 
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(prescriptionCode).getBytes("utf-8"));
		}else if(requestType.equals("findPrescriptionByDoctorId")){  
			String doctorId = request.getParameter("doctorId").toString();
			System.out.print(doctorId);
			List<Map<String,Object>> prescriptions = prescribeService.findPrescriptionByDoctorId(doctorId); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(prescriptions).getBytes("utf-8")); 
		}else if (requestType.equals("queryAllPrescribeByCus")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String customerId = request.getParameter("customerId").toString();
			int total = prescribeService.findPrescriptionByCustomerId(customerId).size();
			List<Map<String, Object>> pres = prescribeService.findPrescriptionByCustomerIdLimit(customerId, page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", pres);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		}else if(requestType.equals("findPrescribeByCode")){  
			String prescriptionCode = request.getParameter("prescriptionCode").toString();
			System.out.print(prescriptionCode);
			List<Map<String,Object>> prescription = prescribeService.findPrescribeByCode(prescriptionCode); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(prescription).getBytes("utf-8")); 
		}else if(requestType.equals("selectPrescription")){  
			String selItem = request.getParameter("selItem").toString();
			String doctorId = request.getParameter("doctorId").toString();
			String selContent = request.getParameter("selContent").toString();
			List<Map<String,Object>> prescriptions = prescribeService.selectPrescription(doctorId, selContent, selItem);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", prescriptions);
			result.put("count", "1000");
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			System.out.print(result);
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
	}
	}

}
