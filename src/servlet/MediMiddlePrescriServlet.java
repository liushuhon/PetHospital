package servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.AdminService;
import service.MediMiddlePrescriService;

import com.alibaba.fastjson.JSON;

import entity.MediMiddlePrescri;

/**
 * Servlet implementation class MediMiddlePrescriServlet
 */
@WebServlet("/MediMiddlePrescriServlet")
public class MediMiddlePrescriServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MediMiddlePrescriServlet() {
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
		MediMiddlePrescriService service = new MediMiddlePrescriService();
		if(requestType.equals("addMiddle")){
			String medicineId = request.getParameter("medicineId").toString();
			String price = request.getParameter("price").toString();
			String customerId = request.getParameter("customerId").toString(); 
			MediMiddlePrescri mePrescri = new MediMiddlePrescri();
			mePrescri.setCustomerId(customerId);
			mePrescri.setMark(0);
			mePrescri.setPrice(Double.parseDouble(price));
			mePrescri.setMedicineId(medicineId);
			service.addMedi_Prescri(mePrescri); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		} else if (requestType.equals("selectByMark0")) {
			String customerId = request.getParameter("customerId");
			String mark = request.getParameter("mark");
			List<Map<String, Object>> middles = service.selectByMark(customerId, mark);
			double sum = 0;
			for (Map<String, Object> map : middles) {
				sum += Double.parseDouble((map.get("price").toString()));
			}
		}
	}

}
