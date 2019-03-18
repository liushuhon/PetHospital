layui.use(['layer','form','jquery'],function(){
	
	var $ = layui.jquery,form = layui.form;
	var prescriptionCode = getUrlParam('prescriptionCode');
/*	var customerId,doctorCode,petId;*/
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/PrescribeServlet",
		dataType : 'json',
		data : {
			'types' : 'findPrescribeByCode', 
			'prescriptionCode' : prescriptionCode
		},
		success : function(data) {
			datas = eval(data);    
			console.log(datas)
			$("#totalPrice").html(datas[0].totalPrice+"元");
			$("#customerName").html(datas[0].userName);
			$("#petName").html(datas[0].nickname);
			$("#gender").html(datas[0].gender);
			$("#species").html(datas[0].species);
			$("#weight").html(datas[0].weight);
			$("#color").html(datas[0].color);
			$("#immunity").html(datas[0].immunity);
			$("#sterilization").html(datas[0].sterilization);
			$("#symptom").html(datas[0].symptom);
			$("#medicines").html(datas[0].medicines);/*
			customerId = datas[0].customerCode;
			petId = datas[0].petCode;
			doctorId = datas[0].doctorCode;*/
		},
		error : function(error) {
			alert("cannot find!");
		}
	}); 
	
	form.on('submit(prescribeSubmit)',function(data){
		 location.href="historyRegistration.html";
	});
	
	
})