layui.define(['element','layer'],function(exports){ 
    var $ = layui.$, layer = layui.layer;
    $(document).on('click','#submitPassword',function(){
	var rePassword = $("#rePassword").val();
  	var newPassword = $("#newPassword").val();  
  	getCurUser(); 
  	if(rePassword == curPassword){
  	  	$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/DoctorServlet",
			dataType : 'json',
			crossDomain:true,
			data : {
				'type' : 'changePassword',
				'username' : curUsername,
				'password' : newPassword
			},
			success : function(data) {  
				alert("修改成功,请重新登录"); 
				window.parent.location.href="../login.html";
				window.event.returnValue=false; 
			},
			error : function(error) {
				alert("error!");
			}
		}); 
  	}else{
  		layer.msg("原密码错误！");
  	}

 });
    exports('login');
});
 