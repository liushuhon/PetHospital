 
     (function(){
    	 
    	 layui.use(['jquery', 'layer','form'], function(){ 
       	  var $ = layui.$ //重点处
       	  ,layer = layui.layer,form = layui.form;
       	  
       		$.ajax({
   				type : "POST",
   				async : false,
   				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
   				url : "/PetHospital/servlet/DoctorServlet",
   				dataType : 'json',
   				data : {
   					'type' : 'findDoctorById',
   					'id' : 1
   				},
   				success : function(data) {
   					datas = eval(data);  
   					$("#doctorCode").val(datas[0].doctorCode);
   					$("#doctorName").val(datas[0].doctorName); 
   					$("#age").val(datas[0].age); 
   					$("#level").val(datas[0].level); 
   					$("#medicalSkill").val(datas[0].medicalSkill); 
   					$("#phone").val(datas[0].phone); 
   					$("#jobTitle").val(datas[0].Jobtitle);  
   					$("#description").val(datas[0].description);   
   					$("#doctorPhoto").attr('src',datas[0].photo);    
   				    $("input[name='doctorSex'][value=1]").attr("checked", data[0].gender == 'nan' ? true : false);
   		            $("input[name='doctorSex'][value=2]").attr("checked", data[0].gender == 'nv' ? true : false);
   		            form.render(); 
   				},
   				error : function(error) {
   					alert("cannot find!");
   				}
   			}); 
       		
       	  form.on('submit(formDemo)', function(data){  
       		$.ajax({
   				type : "POST",
   				async : false,
   				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
   				url : "/PetHospital/servlet/DoctorServlet",
   				dataType : 'json',
   				data : {
   					'type' : 'updateDoctorById', 
   					'doctorCode' : $("#doctorCode").val(),
   					'description' : $("#description").val(),
   					'medicalSkill' : $("#medicalSkill").val(),
   					'phone' : $("#phone").val(),
   					'age' : $("#age").val()
   				},
   				success : function(data) {
   					datas = eval(data);  
   					alert('修改成功');
   		            form.render(); 
   				},
   				error : function(error) {
   					alert("cannot find!");
   				}
   			});  
       	     
       	  });
       	 
       	});
    	 
     })();
     
    