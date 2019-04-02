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

import service.CustomerService;
import service.PetService;
import util.Common;

import com.alibaba.fastjson.JSON;

import entity.Customer;
import entity.Pet; 

/**
 * Servlet implementation class PetServlet
 */
@WebServlet("/PetServlet")
public class PetServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PetServlet() {
        super(); 
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
		Pet pet = new Pet();
		PetService petService = new PetService();
		Common common = new Common();
		if(requestType.equals("queryAllPet")){
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = petService.queryAllPets().size();
			List<Map<String, Object>> pets = common.toBase64(petService.queryAllByLimits(page, limit), "petImg");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", pets);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if (requestType.equals("queryByCusCode")) {
			String customerCode = request.getParameter("customerCode");
			List<Map<String,Object>> pets = petService.queryByCusId(customerCode);
			List<Map<String,Object>> petsToBase64 = common.toBase64(pets, "petImg"); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(petsToBase64).getBytes("utf-8")); 
		}else if(requestType.equals("selectPet")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int total = petService.selectPet(selItem, selContent).size();
			List<Map<String,Object>> pets = common.toBase64(petService.selectPetByLimits(selItem, selContent, pageSize, currPage), "petImg"); 
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
