layui.use([ 'element', 'carousel', 'layer','jquery' ], function() {
	var element = layui.element, carousel = layui.carousel, layer = layui.layer, $ = layui.jquery;
	// 建造实例
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
	layer.config({skin: 'my-skin'});
	getCurCustomer()
});
function selectTab(idx) {
    for (var i = 1; i <= 9; i++) {
       if (idx == i) {
            document.getElementById("TD" + i).className = "tabSelect";
       } else {
            document.getElementById("TD" + i).className = "tabUnSelect";
       }
    }
}

/**
 * 弹窗
 * @param id
 */
function popIntro(id) { 
	
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/DoctorServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'findDoctorById', 
			'id' : id
		},
		success : function(data) {
			var doctor = eval(data[0]);   
			$('#popImg').attr('src',doctor.photo);
			$('#popName').html(doctor.doctorName);
			$('#popLevel').html(doctor.level);
			$('#popPhone').html("联系电话"+doctor.phone);
			$('#popSkill').html(doctor.medicalSkill);
			$('#popJobTitle').html(doctor.Jobtitle);
			$('#popLevel2').html(doctor.level);
			$('#popDescribe').html(doctor.description); 
			 layer.open({
				 type:1,
				  title :'医生介绍'
				  ,content:  $('#popDocIntro')
				  ,btn: ['确定']  
			 	  ,area: ['50%', '80%']
				  ,yes: function(index, layero){ 
					  layer.close(index);
				  } 
				  ,cancel: function(index){ 
					  layer.close(index);
				  }
				});
			 $('#popDocIntro').hover(function(){
				    $().css("overflow","auto")
				},function(){
				    $().css("overflow","hidden")
				})
		},
		error : function(error) { 
		}
	});
	
	
}
/**
 * 按部门查找
 * @param skill
 */
function queryDoctor(idx,skill){ 
	selectTab(idx);
	if (idx===1) {
		queryAllDoctor();
	}else {
		queryBySkill(skill);
	}
}
/**
 * 按medicalSkill查找医生
 */
function queryBySkill(skill) {
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/DoctorServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'queryByMedicalSkill', 
			'medicalSkill' : skill
		},
		success : function(data) {
			var datas = eval(data);   
			formateDoctorIntro(datas); 
		},
		error : function(error) { 
		}
	});
}
/**
 * 查找所有医生
 */
function queryAllDoctor() {
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/DoctorServlet",
		dataType : 'json',
		async:false,
		data : {
			'type' : 'queryAll',  
		},
		success : function(data) {
			var datas = eval(data);   
			formateDoctorIntro(datas); 
		},
		error : function(error) { 
		}
	});
}
/**
 * 查找出来后插入页面
 * @param doctors
 */
function formateDoctorIntro(doctors){
    $('#doctorIntro').html("");
    var infos = '';
    doctors.map(function(curr,index) { 
    	infos +=   "<div class='layui-col-md4 width30'>" +
        "<div class='layui-card' >" +
        "<div class='layui-card-header' onclick='popIntro("+curr.id+")'>" +
         "<img  src='"+curr.photo+"'>" +
         "</div>" +	
         "<div class='layui-card-body introspan'>" +
         "<span class='black'>"+curr.doctorName+"</span>"+
         "<span class='purple'>"+curr.level+"</span>"+
         "<span class='gray'>"+curr.medicalSkill+"</span> <a href='javascript:;' onclick=makeAppoint('"+curr.doctorName+"',"+curr.doctorCode+")>立即预约</a>"+
         "</div>" +
         "</div>" +
         "</div>";
    }) 
     $('#doctorIntro').append(infos);
}
function makeAppoint(doctorName,doctorCode){
	if (cusId!=='') {
		location.href='registration.html?doctorName='+doctorName+'&doctorCode='+doctorCode;
	} else {
		alert('请先登录');
		location.href="login.html"
	}
}