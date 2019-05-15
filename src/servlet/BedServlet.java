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
import service.InHospitalService;
import util.Common;

import com.alibaba.fastjson.JSON;

import entity.Bed;
import entity.InHospital;

/**
 * Servlet implementation class BedServlet
 */
@WebServlet("/BedServlet")
public class BedServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BedServlet() {
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
		BedService service = new BedService();
		Common common = new Common();
		String requestType = request.getParameter("type");
		if(requestType.equals("addBed")){ 
			String bedCode = common.getRandomCard();
			String state = request.getParameter("state").toString();
			String petId = null;
			Bed bed = new Bed(bedCode, petId, state);
			service.addBed(bed);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if (requestType.equals("queryAllBed")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = service.queryBed().size();
			List<Map<String, Object>> beds = service.queryAllBed(page, limit);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", beds);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if (requestType.equals("deleteBed")) {
			String bedCode = request.getParameter("bedCode");
			service.deleteBed(bedCode);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("updateBed")) {
			Bed bed = new Bed();
			bed.setPetId(request.getParameter("petId").toString());
			if (bed.getPetId().length()==0) {
				bed.setPetId(null);
			}
			bed.setBedCode((request.getParameter("bedCode").toString()));
			bed.setState((request.getParameter("state").toString()));
			service.updateBed(bed);
			OutputStream outputStream = response.getOutputStream();
			outputStream.write(JSON.toJSONString(true).getBytes("utf-8"));
		} else if (requestType.equals("selectBed")) {
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int bedNum = service.selectBed(selItem, selContent).size();
			List<Map<String, Object>> beds = service.selectBedByLimits(selItem, selContent, pageSize, currPage);
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", beds);
			result.put("count", bedNum);
			result.put("msg", "");
			result.put("code", "0");
			System.out.print(JSON.toJSONString(result));
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(result).getBytes("utf-8"));
		} else if(requestType.equals("getAllBed")){
			List<Map<String, Object>> beds = service.queryBed();
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(beds).getBytes("utf-8"));
		}else if(requestType.equals("getAllFreeBeds")){
			List<Map<String, Object>> beds = service.selectFreeBed();
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(beds).getBytes("utf-8"));
		}
		
	}

}
