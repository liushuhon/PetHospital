var cusId = '';
function getCurCustomer(){ 
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/UserServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'getCusSeesion', 
		},
		success : function(data) {
			var datas = eval(data);   
			cusName = datas.username;
			cusPassword = datas.password; 
			cusPhoto = datas.photo; 
			cusId = datas.userId;
			console.log(cusId)
			document.getElementById('logined').style.display = 'block';
			document.getElementById('cusPhoto').setAttribute('src', cusPhoto);
			document.getElementById('unlogined').style.display = 'none';
		},
		error : function(error) { 
		}
	});
}
function cusLogout(){
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/UserServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'cusLogout', 
		},
		success : function(data) {
			document.getElementById('logined').style.display = 'none'; 
			document.getElementById('unlogined').style.display = 'block';
		},
		error : function(error) { 
		}
	});
}