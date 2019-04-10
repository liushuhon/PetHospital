package servlet;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON; 

import service.AdminService;
import service.CustomerService;
 
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import util.Common;
import entity.Customer;

/**
 * Servlet implementation class CustomerServlet
 */
@WebServlet("/CustomerServlet")
public class CustomerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CustomerServlet() {
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
		Common common = new Common();
		CustomerService customerService = new CustomerService();
		if(requestType.equals("selectCustomer")){ 
			String selItem = request.getParameter("selItem").toString();
			String selContent = request.getParameter("selContent").toString();
			int pageSize = Integer.parseInt(request.getParameter("nums").toString()); 
			int currPage = Integer.parseInt(request.getParameter("curr").toString());
			int total = customerService.selectCustomer(selItem, selContent).size();
			List<Map<String,Object>> customers = common.toBase64(customerService.selectCustomerByLimits(selItem, selContent, pageSize, currPage), "photo"); 
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", customers);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		}else if(requestType.equals("register")){
			PrintWriter writer = response.getWriter();
			String customerCode = getRandomCard();  
			String userName =  request.getParameter("userName");
			String password =  request.getParameter("password");
			String phone =  request.getParameter("phone");
			String address =  request.getParameter("address");
			String gender =  request.getParameter("gender"); 
			Customer customer = new Customer();
			customer.setUserName(userName);
			customer.setAddress(address);
			customer.setCustomerCode(customerCode);
			customer.setGender(gender);
			customer.setPassword(password);
			customer.setPhone(phone); 
			String imgString = request.getParameter("photo");
			String im = processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+customerCode+".jpg";
			customer.setPhoto(path); 
			customerService.addCustomer(customer); 
			generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + getImageStr(path));
			writer.flush();
			writer.close(); 
			  
		}else if(requestType.equals("login")){ 
			String phone = request.getParameter("phone");
			String password = request.getParameter("password");
			List<Map<String, Object>> customers = customerService.login(phone, password);
			if (customers.size()!=0) {
				request.getSession().setAttribute("cusCode", customers.get(0).get("customerCode")); 
				request.getSession().setAttribute("cusName", customers.get(0).get("userName")); 
				request.getSession().setAttribute("cusPassword", customers.get(0).get("password"));   
				request.getSession().setAttribute("cusPhoto", customers.get(0).get("photo"));  
				OutputStream out = response.getOutputStream(); 
				out.write(JSON.toJSONString(true).getBytes("utf-8")); 
			} 
		}else if (requestType.equals("queryAllCustomer")) {
			int page = Integer.parseInt(request.getParameter("curr").toString());
			int limit = Integer.parseInt(request.getParameter("nums").toString());
			int total = customerService.queryAllCustomer().size();
			List<Map<String, Object>> customers = common.toBase64(customerService.queryAllByLimits(page, limit), "photo");
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("data", customers);
			result.put("count", total);
			result.put("msg", "");
			result.put("code", "0");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(result).getBytes("utf-8")); 
		} else if(requestType.equals("queryByCode")){ 
			String code = request.getParameter("code").toString(); 
			Map<String, Object> customer = customerService.queryByCode(code);
			customer = common.toBase64(customer, "photo");
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(customer).getBytes("utf-8")); 
		} else if(requestType.equals("updateByCode")){ 
			String code = request.getParameter("cusCode").toString(); 
			String gender = request.getParameter("gender").toString(); 
			String address = request.getParameter("address").toString(); 
			String userName = request.getParameter("userName").toString(); 
			String phone = request.getParameter("phone").toString(); 
			Customer customer = new Customer(code, userName, phone, address, gender);
			customerService.updateByCode(customer);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}else if(requestType.equals("updatePhotoByCode")){ 
			PrintWriter writer = response.getWriter();
			String code = request.getParameter("cusCode").toString(); 
			String imgString = request.getParameter("photo");
			String im = processImgStr(imgString);
			String path = "D:/angular/workspace/PetHospital/image/"+code+".jpg"; 
			customerService.updatePhotoByCode(path, code);
			generatorImage(im,path);
			String imgHeader = "data:image/png;base64,";
			writer.write(imgHeader + getImageStr(path));
			writer.flush();
			writer.close(); 
		} else if(requestType.equals("updatePwdByCode")){ 
			String code = request.getParameter("cusCode").toString(); 
			String pwd = request.getParameter("password").toString(); 
			customerService.updatePwdByCode(pwd, code);
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(true).getBytes("utf-8")); 
		}
		
	}
	public static String getRandomCard() {
		Random rand = new Random();// 生成随机数
		String cardNnumer = "";
		for (int a = 0; a < 6; a++) {
			cardNnumer += rand.nextInt(10);// 生成6位数字
		}
		return cardNnumer;
	}
	/**
	 * 去除base64原来的东西
	 * @param imgStr
	 * @return
	 */
	public String processImgStr(String imgStr){
		int headIndex = imgStr.indexOf(',') + 1;
		return imgStr.substring(headIndex);
	}
	/**
	 * @Description: 将base64编码字符串转换为图片
	 * @Author: 
	 * @CreateTime: 
	 * @param imgStr base64编码字符串
	 * @param path 图片路径-具体到文件
	 * @return
	 */
	
	public boolean  generatorImage(String imgStr,String filePath){
		if(imgStr==null){
			return false;
		}
		else {
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				//解密过程
				byte[] imgByte = decoder.decodeBuffer(imgStr);
				//处理数据
				for(int i = 0; i < imgByte.length; i ++){
					if(imgByte[i] < 0){
						imgByte[i] += 256;
					}
				}
				OutputStream out = new FileOutputStream(filePath);
				out.write(imgByte);
				out.flush();
				out.close();
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
		}
	}
	
	
	/**
	 * @Description: 根据图片地址转换为base64编码字符串
	 * @Author: 
	 * @CreateTime: 
	 * @return
	 */
	public String getImageStr(String imgFile) {
	    InputStream inputStream = null;
	    byte[] data = null;
	    try {
	        inputStream = new FileInputStream(imgFile);
	        data = new byte[inputStream.available()];
	        inputStream.read(data);
	        inputStream.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    // 加密
	    BASE64Encoder encoder = new BASE64Encoder();
	    return encoder.encode(data);
	}
}
