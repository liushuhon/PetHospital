package servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.DoctorService;
import sun.misc.BASE64Encoder;

import com.alibaba.fastjson.JSON;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import entity.Doctor;

/**
 * Servlet implementation class Doctor
 */
@WebServlet("/Doctor")
public class DoctorServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DoctorServlet() {
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
		DoctorService doctorService = new DoctorService();
		if(requestType.equals("findDoctorById")){
			String id = request.getParameter("id").toString();
			List<Map<String,Object>> doctor = doctorService.findDoctorById(id); 
			HashMap<String, Object> temp=(HashMap<String, Object>) doctor.get(0);
			String imgHeader = "data:image/png;base64,";
			String s = imgHeader + getImageStr(temp.get("photo").toString());
			temp.put("photo", s); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor).getBytes("utf-8")); 
		}
		else if(requestType.equals("updateDoctorById")){
			Doctor doctor = new Doctor();
			doctor.setDoctorCode(request.getParameter("doctorCode"));
			doctor.setAge(Integer.parseInt(request.getParameter("age")));
			doctor.setDescription(request.getParameter("description"));
			doctor.setMedicalSkill(request.getParameter("medicalSkill").toString());
			doctor.setPhone(request.getParameter("phone")); 
			List<Map<String,Object>> doctor1 = doctorService.updateDoctor(doctor);  
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor1).getBytes("utf-8")); 
		}
		else if(requestType.equals("findDoctorByUsernameAndPassword")){
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			request.getSession().setAttribute("username", username); 
			request.getSession().setAttribute("password", password); 
			List<Map<String,Object>> doctor = doctorService.findDoctorByUsernameAndPassword(username, password);
			request.getSession().setAttribute("userId", doctor.get(0).get("doctorCode")); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor).getBytes("utf-8"));
		}
		else if(requestType.equals("changePassword")){
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			List<Map<String,Object>> doctor1 = doctorService.changePassword(password, username);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor1).getBytes("utf-8"));
		}
	}
	public String getImageStr(String imgFile) {
	    InputStream inputStream = null;
	    byte[] data = null;
	    try {
	        inputStream = new FileInputStream(imgFile);
	        data = new byte[inputStream.available()];
	        inputStream.read(data);
	        inputStream.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    // º”√‹
	    BASE64Encoder encoder = new BASE64Encoder();
	    return encoder.encode(data);
	}

}
