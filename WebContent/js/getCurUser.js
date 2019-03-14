/**
 * 
 */
function getCurUser(){ 
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/UserServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'getUser', 
		},
		success : function(data) {
			var datas = eval(data);  
			console.log(datas)
			curUserId = datas.userId;
			
			curUsername = datas.username;
			curPassword = datas.password; 
			console.log(curUserId+" "+curUsername+" "+curPassword)
		},
		error : function(error) {
			alert("error");
		}
	});
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}