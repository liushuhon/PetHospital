package servlet;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.DoctorService;
import util.Common;

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
		Common common = new Common();
		if(requestType.equals("findDoctorById")){
			String id = request.getParameter("id").toString();
			List<Map<String,Object>> doctor = doctorService.findDoctorById(id); 
			HashMap<String, Object> temp=(HashMap<String, Object>) doctor.get(0);
			String imgHeader = "data:image/png;base64,";
			String s = imgHeader + common.getImageStr(temp.get("photo").toString());
			temp.put("photo", s); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor).getBytes("utf-8")); 
		} else if(requestType.equals("findDoctorByCode")){
			String code = request.getParameter("code").toString();
			List<Map<String,Object>> doctor = doctorService.findDoctorByCode(code);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctor).getBytes("utf-8")); 
		}
		else if(requestType.equals("updateDoctorById")){
			PrintWriter writer = response.getWriter();
			Doctor doctor = new Doctor();
			doctor.setDoctorCode(request.getParameter("doctorCode"));
			doctor.setAge(Integer.parseInt(request.getParameter("age")));
			doctor.setDescription(request.getParameter("description"));
			doctor.setMedicalSkill(request.getParameter("medicalSkill").toString());
			doctor.setPhone(request.getParameter("phone")); 
			doctor.setGender(request.getParameter("gender")); 
			String imgString = request.getParameter("photo");
			String im = common.processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+request.getParameter("doctorCode")+".jpg"; 
			doctor.setPhoto(path);
			List<Map<String,Object>> doctor1 = doctorService.updateDoctor(doctor);
			common.generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + common.getImageStr(path));
			writer.flush();
			writer.close();
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
		else if(requestType.equals("queryByMedicalSkill")){
			String medicalSkill = request.getParameter("medicalSkill");
			List<Map<String, Object>> doctors = doctorService.queryByMedicalSkill(medicalSkill);
			for (Map<String, Object> map : doctors) { 
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + common.getImageStr(map.get("photo").toString());
				map.put("photo", s); 
			}
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctors).getBytes("utf-8"));
		}
		else if(requestType.equals("queryAll")){ 
			List<Map<String, Object>> doctors = doctorService.queryAll();
			for (Map<String, Object> map : doctors) { 
				String imgHeader = "data:image/png;base64,";
				String s = imgHeader + common.getImageStr(map.get("photo").toString());
				map.put("photo", s); 
			}
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(doctors).getBytes("utf-8"));
		}else if (requestType.equals("queryAllDoctor")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = doctorService.queryAllDoctor().size();
			List<Map<String, Object>> doctors = common.toBase64(doctorService.queryAllByLimits(page, limit), "photo");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", doctors);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("selectDoctor")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int total = doctorService.selectDoctor(selItem, selContent).size();
			List<Map<String,Object>> doctors = common.toBase64(doctorService.selectDoctorByLimits(selItem, selContent, pageSize, currPage), "photo"); 
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", doctors);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("updateDoctorByAdmin")){ 
			String workTime = request.getParameter("workTime").toString();
			String doctorCode = request.getParameter("doctorCode").toString();
			String level = request.getParameter("level").toString();
			String jobTitle = request.getParameter("jobTitle").toString();
			String medicalSkill = request.getParameter("medicalSkill").toString();
			doctorService.updateDoctorByAdmin(doctorCode, workTime, jobTitle, level, medicalSkill);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}
	}

}
