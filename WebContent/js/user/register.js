layui.use([ 'form', 'upload' ], function() {
	var form = layui.form, upload = layui.upload;
	form.verify({
		'isValid' : function(value, item) {
			var checkValue = value.trim();
			if (checkValue.length < 6) {
				return '密码由6-10位数字和字母构成'
			}
		},
		'repwd' : function(value, item) {
			var repwd = value.trim();
			var pwd = document.getElementsByName('password')[0].value;
			if (pwd !== repwd) {
				return '请输入相同的密码';
			}
		}
	})
	form.on('submit(formRegister)', function(data) {
		var data = data.field;
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/CustomerServlet",
			dataType : 'json',
			data : {
				'type' : 'register',
				'userName' : data.userName,
				'password' : data.password,
				'phone' : data.phone,
				'address' : data.address,
				'gender' : data.gender,
				'photo' : imgSrc
			},
			success : function(data) { 
				layer.msg('注册成功,即将进入登录页面', {time:1*1000}, function(){ 
					location.href='login.html'
				})
			},
			error : function(data) {
				layer.msg('注册成功,即将进入登录页面', {time:1*1000}, function(){ 
					location.href='login.html'
				})
			}
		}) 
	});

});
var imgSrc = '';

function uploadPhoto() {
	var input = $("#xFile");
	var file = input[0].files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var txt = event.target.result;
		var img = $("#photo");
		imgSrc = txt;
		img.attr('src',imgSrc);
		
	} 
	reader.readAsDataURL( file );
}