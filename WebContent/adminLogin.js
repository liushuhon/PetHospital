 
layui.define(['element','layer'],function(exports){
    var $ = layui.$, layer = layui.layer;
    $('.input-field').on('change',function(){
        var $this = $(this),
            value = $.trim($this.val()),
            $parent = $this.parent(); 
        if(value !== '' && !$parent.hasClass('field-focus')){
            $parent.addClass('field-focus');
        }else{
            $parent.removeClass('field-focus');
        } 
    }) 
    $(document).on('click','#adminLogin',function(){
	var username = $("#username").val();
  	var password = $("#password").val();
  	$.ajax({
				type : "POST",
				async : false,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				url : "/PetHospital/servlet/AdminServlet",
				dataType : 'json',
				data : {
					'type' : 'findAdminByUsernameAndPassword',
					'username' : username,
					'password' : password
				},
				success : function(data) {
					if(data.length!=0){ 
						adminId = data[0].id,
						getCurAdmin();
						window.location.href="adminIndex.html";
					}else{
						layer.msg("用户名或密码错误")
					}
		            
				},
				error : function(error) {
					layer.msg("用户名或密码错误")
				}
			}); 
 });
    exports('adminLogin');
});
 