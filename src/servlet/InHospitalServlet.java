package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;

import service.BedService;
import service.InHospitalService;
import service.RegistrationService;
import util.Common;
import entity.Bed;
import entity.InHospital;

/**
 * Servlet implementation class InHospitalServlet
 */
@WebServlet("/InHospitalServlet")
public class InHospitalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InHospitalServlet() {
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
		InHospitalService service = new InHospitalService();
		BedService bService = new BedService();
		RegistrationService rService = new RegistrationService();
		String requestType = request.getParameter("type");
		if(requestType.equals("addInHospital")){ 
			String customerId = request.getParameter("customerId").toString();
			String petId = request.getParameter("petId").toString();
			String stayDays = request.getParameter("stayDays").toString();
			String mark = request.getParameter("mark").toString();
			String bedId = request.getParameter("bedId");
			String hospitalPrice = request.getParameter("hospitalPrice");
			String doctorId = request.getParameter("doctorId");
			String petName = request.getParameter("petName");
			String cusName = request.getParameter("cusName");
			String docName = request.getParameter("docName");
			String registrationCode = request.getParameter("registrationCode");
			Double advancePay = Double.parseDouble(request.getParameter("advancePay").toString());
			Bed bed = new Bed();
			bed.setPetId(petId);
			bed.setState("Âú");
			bed.setBedCode(bedId);
			bService.updateBed(bed);
			InHospital inHospital = new InHospital(customerId, petId, bedId, doctorId, Double.parseDouble(hospitalPrice), mark, Integer.parseInt(stayDays), petName, docName, cusName, advancePay);
			service.addInHospital(inHospital);
			String id = service.selectInHospitalByPetId(petId).get(0).get("id").toString();
			rService.updateState(registrationCode);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(id).getBytes("utf-8")); 
		}else if (requestType.equals("queryAllInHospital")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String doctorId = request.getParameter("doctorId").toString();
			String mark = request.getParameter("mark").toString();
			int total = service.queryInHospitalByDoc(doctorId, mark).size();
			List<Map<String, Object>> hospitals = service.queryAllInHospitalByDoc(doctorId, mark, page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", hospitals);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("updateInHospital")) {
			service.updateInHospital(request.getParameter("petId").toString(),request.getParameter("mark").toString());
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectInHospital")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			String doctorId = request.getParameter("doctorId").toString();
			String mark = request.getParameter("mark").toString();
			int hospitalNum = service.selectInHospitalByDoc(doctorId, mark, selItem, selContent).size();
			List<Map<String, Object>> hospitals = service.selectInHospitalByLimits(doctorId, mark, selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", hospitals);
			result.put("count", hospitalNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if(requestType.equals("getAllInHospital")){
			String doctorId = request.getParameter("doctorId").toString();
			String mark = request.getParameter("mark").toString();
			List<Map<String, Object>> hospitals = service.queryInHospitalByDoc(doctorId, mark);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(hospitals).getBytes("utf-8"));
		} else if(requestType.equals("selectById")){
			String id = request.getParameter("id").toString();
			List<Map<String, Object>> hospitals = service.selectInHospitalById(id);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(hospitals).getBytes("utf-8"));
		} else if(requestType.equals("updatePrice")){
			String id = request.getParameter("id").toString();
			String newPrice = request.getParameter("newPrice").toString();
			service.updatePrice(id, newPrice);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if(requestType.equals("selectByCusId")){
			
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String customerId = request.getParameter("customerId").toString();
			String mark = request.getParameter("mark").toString();
			int total = service.queryInHospitalByCusId(customerId, mark).size();
			List<Map<String, Object>> hospitals = service.queryAllInHospitalByCusId(customerId, mark, page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", hospitals);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} 
	}

}
