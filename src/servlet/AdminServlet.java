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
 



import service.AdminService;

import com.alibaba.fastjson.JSON;

/**
 * Servlet implementation class AdminServlet
 */
@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AdminServlet() {
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
		AdminService adminService = new AdminService();
		if(requestType.equals("findAdminByUsernameAndPassword")){
			String username = request.getParameter("username").toString();
			String password = request.getParameter("password").toString();
			request.getSession().setAttribute("adminName", username); 
			request.getSession().setAttribute("adminPwd", password); 
			List<Map<String,Object>> admin = adminService.findAdminByUsernameAndPassword(username, password);  
			request.getSession().setAttribute("adminId", admin.get(0).get("id")); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(admin).getBytes("utf-8")); 
		} else if (requestType.equals("changePassword")) {
			String id = request.getParameter("userId");
			String newPassword = request.getParameter("password");
			List<Map<String,Object>> admin = adminService.changePassword(newPassword, id); 
			OutputStream out = response.getOutputStream(); 
			out.write(JSON.toJSONString(admin).getBytes("utf-8")); 
		}
	}

}
