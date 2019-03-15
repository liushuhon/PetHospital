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

import service.medicine.ManuService;
import service.medicine.SupplierService;

import com.alibaba.fastjson.JSON;

import dao.medicine.ManuDao;
import dao.medicine.SupplierDao;
import entity.medicine.Manufacture;
import entity.medicine.Supplier;

/**
 * Servlet implementation class SupplierServlet
 */
@WebServlet("/SupplierServlet")
public class SupplierServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SupplierServlet() {
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
		SupplierDao supplierDao = new SupplierDao();
		Supplier supplier = new Supplier();
		SupplierService supplierService = new SupplierService();
		if (requestType.equals("queryAllSupplier")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = supplierDao.querySupplier().size();
			List<Map<String, Object>> suppList = supplierService.queryAllSupplier(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", suppList);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteSupplier")) {
			String id = request.getParameter("id");
			supplierService.deleteSupplier(id);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateSupplier")) {
			supplier.setId(request.getParameter("id").toString());
			supplier.setSupplier(request.getParameter("supplier").toString());
			supplier.setTel(request.getParameter("tel").toString());
			supplierService.updateSupplier(supplier);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("addSupplier")) {
			String supplierName = request.getParameter("supplier").toString();
			String tel = request.getParameter("tel").toString();
			Supplier supplier2 = new Supplier();
			supplier2.setSupplier(supplierName);
			supplier2.setTel(tel);
			supplierService.addSupplier(supplier2);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectSupplier")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int supNum = supplierDao.selectSupplier(selItem, selContent).size();
			List<Map<String, Object>> suppliers = supplierDao.selectSupplierByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", suppliers);
			result.put("count", supNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		}
	
	}

}
