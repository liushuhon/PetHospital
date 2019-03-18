layui.use(['element','layer'],function(exports){ 
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
			url : "/PetHospital/servlet/AdminServlet",
			dataType : 'json',
			crossDomain:true,
			data : {
				'type' : 'changePassword',
				'userId' : curUserId,
				'password' : newPassword
			},
			success : function(data) {  
				alert("修改成功,请重新登录"); 
				window.parent.location.href="../../adminLogin.html";
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
});
 