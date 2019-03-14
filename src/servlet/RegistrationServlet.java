package servlet;

import java.io.Console;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.RegistrationService;

import com.alibaba.fastjson.JSON;

import dao.RegistrationDao;
import entity.Doctor;
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
		RegistrationService registrationService = new RegistrationService();
		if(requestType.equals("findRegistrationByDoctorId")){  
				String doctorId = request.getParameter("doctorId").toString();
				List<Map<String,Object>> registrations = registrationService.findRegistrationByDoctorId(doctorId); 
				OutputStream out = response.getOutputStream(); 
				out.write(JSON.toJSONString(registrations).getBytes("utf-8")); 
		}else if(requestType.equals("findRegistrationByCode")){ 
		    System.out.print(request.getParameter("registrationCode").toString());
			String registrationCode = request.getParameter("registrationCode").toString();
			List<Map<String,Object>> registrations = registrationService.findRegistrationByCode(registrationCode);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(registrations).getBytes("utf-8")); 
		}else if(requestType.equals("selectRegistration")){  
			String selItem = request.getParameter("selItem").toString();
			String doctorId = request.getParameter("doctorId").toString();
			String selContent = request.getParameter("selContent").toString();
			List<Map<String,Object>> registrations = registrationService.selectRegistration(selItem,doctorId,selContent);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", registrations);
			result.put("code", "1000");
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
	}
	}

}
