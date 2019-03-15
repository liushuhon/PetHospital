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
 
import service.medicine.SpecificationService;

import com.alibaba.fastjson.JSON;
 
import dao.medicine.SpecificationDao; 
import entity.medicine.Specification;

/**
 * Servlet implementation class SpecificationServlet
 */
@WebServlet("/SpecificationServlet")
public class SpecificationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SpecificationServlet() {
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
		Specification specification = new Specification();
		SpecificationDao sDao = new SpecificationDao();
		SpecificationService service = new SpecificationService();
		if (requestType.equals("queryAllSpeci")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = sDao.querySpeci().size();
			List<Map<String, Object>> specis = service.queryAllSpeci(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", specis);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteSpeci")) {
			String id = request.getParameter("id");
			service.deleteSpeci(id);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateSpeci")) {
			specification.setSpecification(request.getParameter("specification").toString());
			specification.setId(request.getParameter("id").toString());
			service.updateSpeci(specification);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("addSpeci")) {
			specification.setSpecification(request.getParameter("specification").toString());
			service.addSpeci(specification);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectSpeci")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int cateNum = service.selectSpeci(selItem, selContent).size();
			List<Map<String, Object>> specis = sDao.selectSpeciByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", specis);
			result.put("count", cateNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		}
	}

}
