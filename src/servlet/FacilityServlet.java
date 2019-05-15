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

import entity.AdoptPet;
import entity.Facility;
import service.FacilityService;
import util.Common;

/**
 * Servlet implementation class FacilityServlet
 */
@WebServlet("/FacilityServlet")
public class FacilityServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FacilityServlet() {
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
		FacilityService fService = new FacilityService();
		Common common = new Common();
		String requestType = request.getParameter("type");
		if(requestType.equals("addFacility")){ 
			PrintWriter writer = response.getWriter();
			String faciCode = common.getRandomCard();
			String faciName = request.getParameter("faciName").toString();
			String faciDescribe = request.getParameter("faciDescribe").toString();
			String origin = request.getParameter("origin").toString();
			String state = request.getParameter("state").toString();
			String imgString = request.getParameter("photo");
			String im = common.processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+faciCode+".jpg";
			Facility facility = new Facility(faciCode, faciName, origin, faciDescribe, state,path);
			fService.addFacility(facility);
			common.generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + common.getImageStr(path));
			writer.flush();
			writer.close(); 
		}else if(requestType.equals("queryAllFacility")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = fService.queryAllFacility().size();
			List<Map<String, Object>> facis = common.toBase64(fService.queryAllByLimits(page, limit), "photo");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", facis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("selectFaci")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int total = fService.selectFacility(selItem, selContent).size();
			List<Map<String,Object>> facis = common.toBase64(fService.selectFacilityByLimits(selItem, selContent, pageSize, currPage), "photo"); 
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", facis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("updateFaciByCode")){ 
			PrintWriter writer = response.getWriter();
			String faciCode = request.getParameter("faciCode").toString();
			String faciName = request.getParameter("faciName").toString();
			String faciDescribe = request.getParameter("faciDescribe").toString();
			String origin = request.getParameter("origin").toString();
			String state = request.getParameter("state").toString();
			String imgString = request.getParameter("photo");
			String im = common.processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+faciCode+".jpg";
			Facility facility = new Facility(faciCode, faciName, origin, faciDescribe, state, path);
			fService.updateFaci(facility);
			common.generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + common.getImageStr(path));
			writer.flush();
			writer.close(); 
		}else if(requestType.equals("deleteFaci")){  
			String code = request.getParameter("code");
			fService.deleteFacility(code);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if(requestType.equals("queryAllFaciForUser")){
			List<Map<String, Object>> faci = common.toBase64(fService.queryAllFacility(),"photo"); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(faci).getBytes("utf-8")); 
		}
	}

}
