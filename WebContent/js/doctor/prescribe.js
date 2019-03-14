layui.use(['layer','form','jquery'],function(){
	
	var $ = layui.jquery,form = layui.form;
	var registrationCode = getUrlParam('registrationCode');
	var customerId,doctorCode,petId;
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/RegistrationServlet",
		dataType : 'json',
		data : {
			'type' : 'findRegistrationByCode', 
			'registrationCode' : registrationCode
		},
		success : function(data) {
			datas = eval(data);    
			console.log(datas)
			$("#customerName").val(datas[0].customerName);
			$("#petName").val(datas[0].petName);
			$("#gender").val(datas[0].gender);
			$("#species").val(datas[0].category);
			$("#weight").val(datas[0].weight);
			$("#color").val(datas[0].color);
			$("#immunity").val(datas[0].immunity);
			$("#sterilization").val(datas[0].sterilization);
			customerId = datas[0].customerCode;
			petId = datas[0].petCode;
			doctorId = datas[0].doctorCode;
		},
		error : function(error) {
			alert("cannot find!");
		}
	}); 
	
	form.on('submit(prescribeSubmit)',function(data){
		$.ajax({
				type : "POST",
				async : false,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				url : "/PetHospital/servlet/PrescribeServlet",
				dataType : 'json',
				data : {
					'types' : 'addPrescribe', 
					'customerId' : customerId,
					'petId' :petId,
					'doctorId' : doctorId,
					'symptom' : $("#symptom").val(),
					'medicines' : $("#medicines").val(),
					'registrationCode' : registrationCode
				},
				success : function(data) {
					datas = eval(data);  
					alert('提交成功'); 
					window.location.href="registration.html";
					 
				},
				error : function(error) {
					alert("cannot find!");
				}
			});  
   	     
	});
	form.on('submit(back)',function(data){
	 location.href="registration.html"
	});
	
	 
})