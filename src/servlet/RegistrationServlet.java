package servlet;

import java.io.Console;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.CustomerService;
import service.PetService;
import service.RegistrationService;
import util.Common;
import util.CommonDAO;

import com.alibaba.fastjson.JSON;

import dao.PetDao;
import dao.RegistrationDao;
import entity.Customer;
import entity.Doctor;
import entity.Pet;
import entity.Registration;

/**
 * Servlet implementation class Registration
 */
@WebServlet("/RegistrationServlet")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RegistrationServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String requestType = request.getParameter("type");
		RegistrationService registrationService = new RegistrationService();
		Common common = new Common();
		if (requestType.equals("queryAllRegistration")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String doctorId = request.getParameter("doctorId").toString();
			String state = request.getParameter("state");
			int total = registrationService.findRegistrationByDoctorId(doctorId, state).size();
			List<Map<String, Object>> regis = registrationService.queryAllByLimits(doctorId,page, limit, state);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", regis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("findRegistrationByCustId")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String customerId = request.getParameter("customerId").toString();
			String state = request.getParameter("state");
			int total = registrationService.findRegistrationByCustId(customerId, state).size();
			List<Map<String, Object>> regis = registrationService.queryAllByLimitsForCust(customerId,page, limit, state);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", regis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("findRegistrationByCode")) {
			String registrationCode = request.getParameter("registrationCode")
					.toString();
			List<Map<String, Object>> registrations = registrationService
					.findRegistrationByCode(registrationCode);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(registrations).getBytes("utf-8"));
		} else if (requestType.equals("selectRegistration")) {
			String doctorId = request.getParameter("doctorId").toString();
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums")
					.toString());
			int currPage = Integer.parseInt(request.getParameter("curr")
					.toString());
			String state = request.getParameter("state");
			int total = registrationService.selectRegistration(selItem,doctorId, selContent, state).size();
			List<Map<String, Object>> regis = registrationService.selectRegistrationByLimit(selItem, doctorId, selContent,pageSize, currPage, state);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", regis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("addRegistration")) {
			PrintWriter writer = response.getWriter();
			String registrationCode = common.getRandomCard();
			String petCode = common.getRandomCard();
			String regisTime = request.getParameter("regisTime");
			String petName = request.getParameter("petName");
			String category = request.getParameter("species");
			String doctorId = request.getParameter("doctorId");
			String customerId = request.getParameter("customerId");
			String immunity = request.getParameter("immunity");
			String sterilization = request.getParameter("sterilization");
			String gender = request.getParameter("gender");
			String color = request.getParameter("color");
			String age = request.getParameter("age");
			String weight = request.getParameter("weight");
			String doctorName = request.getParameter("doctorName");
			
			
			
			String date = common.getNow();
			String imgString = request.getParameter("petImg");
			String im = common.processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/" + petCode
					+ ".jpg";

			Pet pet = new Pet(petCode, Integer.parseInt(customerId),
					Integer.parseInt(age), petName, gender, sterilization,
					immunity, category, color, weight, path);
			PetService pService = new PetService();
			common.generatorImage(im, path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + common.getImageStr(path));

			pService.addPet(pet);
			CustomerService cService = new CustomerService();
			Map<String, Object> customer = cService.queryByCode(customerId);
			Registration registration = new Registration(registrationCode,
					Integer.parseInt(customerId), Integer.parseInt(doctorId),
					Integer.parseInt(petCode), customer.get("userName")
							.toString(), customer.get("phone").toString(),
					doctorName, category, petName, date, "待处理", regisTime);
			registrationService.addRegistration(registration);
			writer.flush();
			writer.close();
		} else if (requestType.equals("addRegiByExistPet")) {
			String registrationCode = common.getRandomCard();
			String petCode = request.getParameter("petCode");
			String regisTime = request.getParameter("regisTime");
			String petName = request.getParameter("petName");
			String category = request.getParameter("species");
			String doctorId = request.getParameter("doctorId");
			String customerId = request.getParameter("customerId");
			String doctorName = request.getParameter("doctorName");
			String date = common.getNow(); 
			CustomerService cService = new CustomerService();
			Map<String, Object> customer = cService.queryByCode(customerId);
			Registration registration = new Registration(registrationCode,Integer.parseInt(customerId), Integer.parseInt(doctorId),Integer.parseInt(petCode), customer.get("userName")
							.toString(), customer.get("phone").toString(),doctorName, category, petName, date, "待处理", regisTime);
			registrationService.addRegistration(registration);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if (requestType.equals("updateStateAndDate")) {
			String registrationCode = request.getParameter("registrationCode").toString();
			String state = request.getParameter("state").toString();
			String regisTime = request.getParameter("date").toString(); 
			String date = common.getNow();
			registrationService.updateStateAndDate(registrationCode, state, regisTime,date);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}else if (requestType.equals("findRegistedTime")) {
			String doctorId = request.getParameter("doctorId").toString();
			String date = request.getParameter("date").toString();
			List<Map<String, Object>> regis = registrationService.findRegistedTime(doctorId, date);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(regis).getBytes("utf-8"));
		}
	}

}
