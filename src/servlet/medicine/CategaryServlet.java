package servlet.medicine;

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

import service.medicine.CategaryService;

import com.alibaba.fastjson.JSON;

import dao.medicine.CategaryDao;
import entity.medicine.Categary;

/**
 * Servlet implementation class Categary
 */
@WebServlet("/CategaryServlet")
public class CategaryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CategaryServlet() {
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
		Categary categary = new Categary();
		CategaryService categaryService = new CategaryService();
		CategaryDao categaryDao = new CategaryDao();
		if (requestType.equals("queryAllCategary")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = categaryDao.queryCategary().size();
			List<Map<String, Object>> categarys = categaryService.queryAllCategary(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", categarys);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteCategary")) {
			String id = request.getParameter("id");
			categaryService.deleteCategary(id);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateCategary")) {
			categary.setCategary(request.getParameter("categary").toString());
			categary.setId(request.getParameter("id").toString());
			categaryService.updateCategary(categary);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("addCategary")) {
			String categaryName = request.getParameter("categary");
			categaryService.addCategary(categaryName);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectCategary")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int cateNum = categaryService.selectCategary(selItem, selContent).size();
			List<Map<String, Object>> categarys = categaryDao.selectCategaryByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", categarys);
			result.put("count", cateNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if(requestType.equals("getAllCategory")){
			List<Map<String, Object>> categarys = categaryDao.queryCategary();
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(categarys).getBytes("utf-8"));
		}
	}
}
