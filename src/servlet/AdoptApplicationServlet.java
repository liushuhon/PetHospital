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

import service.AdoptApplicationService;
import service.AdoptPetService;
import util.Common;

import com.alibaba.fastjson.JSON;

import dao.AdoptPetDao;

/**
 * Servlet implementation class AdoptApplicationServlet
 */
@WebServlet("/AdoptApplicationServlet")
public class AdoptApplicationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdoptApplicationServlet() {
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
		AdoptApplicationService service = new AdoptApplicationService();
		Common common = new Common();
		if(requestType.equals("addApplication")){ 
			String userCode = request.getParameter("userCode");
			String petCode = request.getParameter("petCode");  
			service.addApplication(petCode, userCode);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if(requestType.equals("queryAllApp")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String state = request.getParameter("state");
			int total = service.queryApplication(state).size();
			List<Map<String, Object>> apps = common.toBase64(service.queryAllByLimits(page, limit, state), "petPhoto");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", apps);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("selectApp")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			String state = request.getParameter("state");
			int total = service.selectApp(selItem, selContent, state).size();
			List<Map<String,Object>> apps = common.toBase64(service.selectAppByLimits(selItem, selContent, pageSize, currPage, state), "petPhoto"); 
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", apps);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("updateState")){ 
			String id = request.getParameter("id").toString(); 
			String masterid = request.getParameter("masterid").toString(); 
			String petCode = request.getParameter("petCode").toString(); 
			service.updateStateToAgree(id);
			AdoptPetDao dao = new AdoptPetDao();
			dao.updateState(petCode, masterid);
			
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if(requestType.equals("queryAllAppByCus")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			String customerId = request.getParameter("customerId").toString();
			int total = service.queryApplicationByCus(customerId).size();
			List<Map<String, Object>> apps = service.queryAllByLimitsByCus(page, limit, customerId);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", apps);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}
	}

}
