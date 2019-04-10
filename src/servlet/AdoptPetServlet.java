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

import service.AdoptPetService;
import service.PetService;
import util.Common;

import com.alibaba.fastjson.JSON;

import entity.AdoptPet;
import entity.Pet;

/**
 * Servlet implementation class AdoptPetServlet
 */
@WebServlet("/AdoptPetServlet")
public class AdoptPetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdoptPetServlet() {
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
		AdoptPetService service = new AdoptPetService();
		Common common = new Common();
		
		if(requestType.equals("queryAllPet")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String state = request.getParameter("state");
			int total = service.queryAllPets(state).size();
			List<Map<String, Object>> pets = common.toBase64(service.queryAllByLimits(page, limit, state), "photo");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", pets);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("selectPet")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			String state = request.getParameter("state");
			int total = service.selectPet(selItem, selContent, state).size();
			List<Map<String,Object>> pets = common.toBase64(service.selectPetByLimits(selItem, selContent, pageSize, currPage, state), "photo"); 
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", pets);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("updatePetByCode")){ 
			PrintWriter writer = response.getWriter();
			String adoptPetCode = request.getParameter("adoptPetCode").toString();
			String age = request.getParameter("age").toString();
			String nickname = request.getParameter("nickname").toString();
			String sterilization = request.getParameter("sterilization").toString();
			String immunity = request.getParameter("immunity").toString();
			String species = request.getParameter("species").toString();
			String color = request.getParameter("color").toString();
			String weight = request.getParameter("weight").toString();
			String imgString = request.getParameter("photo");
			String im = common.processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+adoptPetCode+".jpg";
			
			AdoptPet aPet = new AdoptPet(adoptPetCode, 1, Integer.parseInt(age), nickname, null, sterilization, immunity, species, color, weight, path);
			service.updatePet(aPet);
			common.generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + common.getImageStr(path));
			writer.flush();
			writer.close(); 
		}else if(requestType.equals("deletePet")){  
			String code = request.getParameter("code");
			service.deletePet(code);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if(requestType.equals("queryAllPetForUser")){ 
			String state = request.getParameter("state");
			List<Map<String, Object>> pets = common.toBase64(service.queryAllPets(state),"photo") ; 
			
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(pets).getBytes("utf-8")); 
		}else if(requestType.equals("queryAllByMaster")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String masterId = request.getParameter("masterId").toString();
			System.out.print(page);
			int total = service.queryAllByMaster(masterId).size();
			List<Map<String, Object>> pets = common.toBase64(service.queryAllByMasterLimits(page, limit, masterId), "photo");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", pets);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}
	}

}
