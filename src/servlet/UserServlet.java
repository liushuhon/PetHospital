package servlet;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.UserService;

import com.alibaba.fastjson.JSON;

import entity.User;

/**
 * Servlet implementation class UserServlet
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserServlet() {
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
		UserService userService = new UserService();
		if(requestType.equals("getUser")){ 
			User user = new User();
			user.setUserId(request.getSession().getAttribute("userId").toString());
			user.setUsername(request.getSession().getAttribute("username").toString());
			user.setPassword(request.getSession().getAttribute("password").toString()); 
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(user).getBytes("utf-8"));
		}else if(requestType.equals("userLogout")){ 
			request.getSession().removeAttribute("userCode"); 
			OutputStream out = response.getOutputStream();
			out.write(JSON.toJSONString(true).getBytes("utf-8"));
		}
	}

}
