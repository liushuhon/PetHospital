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
import service.medicine.ManuService;

import com.alibaba.fastjson.JSON;

import dao.medicine.CategaryDao;
import dao.medicine.ManuDao;
import entity.medicine.Categary;
import entity.medicine.Manufacture;

/**
 * Servlet implementation class Manufacturer
 */
@WebServlet("/ManuServlet")
public class ManuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ManuServlet() {
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
		ManuDao manuDao = new ManuDao();
		Manufacture manu = new Manufacture();
		ManuService manuService = new ManuService();
		if (requestType.equals("queryAllManu")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = manuDao.queryManu().size();
			List<Map<String, Object>> manus = manuService.queryAllManu(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", manus);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteManu")) {
			String id = request.getParameter("id");
			manuService.deleteManu(id);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateManu")) {
			manu.setId(request.getParameter("id").toString());
			manu.setManufacture(request.getParameter("manu").toString());
			manu.setTel(request.getParameter("tel").toString());
			manuService.updateManu(manu);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("addManu")) {
			String manuName = request.getParameter("manu").toString();
			String tel = request.getParameter("tel").toString();
			Manufacture manufacture = new Manufacture();
			manufacture.setManufacture(manuName);
			manufacture.setTel(tel);
			manuService.addManu(manufacture);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectManu")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int manuNum = manuService.selectManu(selItem, selContent).size();
			List<Map<String, Object>> manus = manuDao.selectManuByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", manus);
			result.put("count", manuNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if(requestType.equals("getAllManu")){
			List<Map<String, Object>> manus = manuDao.queryManu();
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(manus).getBytes("utf-8"));
		}
	}

}
