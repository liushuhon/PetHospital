layui.use([ 'element', 'carousel', 'layer', 'form' ], function() {
	var element = layui.element, carousel = layui.carousel, layer = layui.layer, form = layui.form;
	// 建造实例
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
	form.on('submit(login)', function(data) {
		var data = data.field;
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/CustomerServlet",
			dataType : 'json',
			data : {
				'type' : 'login',
				'password' : data.password,
				'phone' : data.phone,
			},
			success : function(data) { 
				getCurCustomer();
				location.href = '../../indexWeb.html';
			},
			error : function(data) { 
				layer.msg('密码用户名错误，请重新登录', {
					time : 1 * 1000
				} )
			}
		});
		return false;
	});
	
});
function register(){
	window.location.href="register.html";
}