package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.BedService;
import service.SituationService;
import service.SituationService;
import util.Common;

import com.alibaba.fastjson.JSON;

import entity.Bed;
import entity.Situation;

/**
 * Servlet implementation class SituationServlet
 */
@WebServlet("/SituationServlet")
public class SituationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SituationServlet() {
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
		SituationService service = new SituationService();
		Common common = new Common();
		String requestType = request.getParameter("type");
		if(requestType.equals("addSituation")){ 
			String doctorId = request.getParameter("doctorId").toString();
			String petId = request.getParameter("petId").toString();
			String note = request.getParameter("note").toString();
			String date = common.getNow();
			String mark = request.getParameter("mark").toString();
	
			Situation situation = new Situation();
			situation.setDate(date);
			situation.setDoctorId(doctorId);
			situation.setMark(mark);
			situation.setNote(note);
			situation.setPetId(petId);
			service.addSituation(situation);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		} else if(requestType.equals("selectByPetId")){
			String petId = request.getParameter("petId").toString();
			String mark = request.getParameter("mark").toString();
			List<Map<String, Object>> situation = service.selectSituationByPetId(petId,mark);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(situation).getBytes("utf-8"));
		} else if(requestType.equals("updateSituation")){
			String petId = request.getParameter("petId").toString();
			service.updateSituation(petId);
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}
	}

}
