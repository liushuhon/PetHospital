layui.use([ 'laydate', 'form', 'carousel' ], function() {
	var form = layui.form, laydate = layui.laydate, carousel = layui.carousel;
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
	var time1 = '';
	var time2 = '';
	// 监听提交
	laydate.render({
		elem : '#regisTime',
		type : 'date',
		min : 0,
		max : 7,
		done: function(value, date, endDate){

		    $('#selectTimeBlock').css('display','')
			$.ajax({
				type : "POST",
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				url : "/PetHospital/servlet/RegistrationServlet",
				dataType : 'json',
				async : false,
				data : {
					'type' : 'findRegistedTime',
					'doctorId' : docCode,
					'date' : value
				},
				success : function(data) {
					let regis = eval(data);
					selectedTime = [];
					regis.map(function(item) {
						selectedTime.push(item.regisTime.split(' ')[1]);
					});
					timeArr.map(function(obj) {
						var selectEle = parent.document.getElementById('selectTime');  
						console.log(selectEle);
						var optionObj = parent.document.createElement("option");  
						optionObj.value = obj;  
						optionObj.innerHTML = obj;
						selectedTime.map(function(item) {
							if(item === obj){
								optionObj.disabled = "disabled";
							}
						});
						selectEle.appendChild(optionObj);    
					});
					layui.form.render();
				},
				error : function(error) {
					
				}
			});
		    console.log(value); //得到日期生成的值，如：2017-08-18
		}
	});

	form.on('submit(registration)', function(data) {
		var data = data.field;
		console.log(data);
		$.ajax({
			type : "POST",
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/RegistrationServlet",
			dataType : 'json',
			async : false,
			data : {
				'type' : 'addRegistration',
				'age' : data.age,
				'color' : data.color,
				'gender' : data.gender,
				'immunity' : data.immunity,
				'petName' : data.petName,
				'regisTime' : data.regisTime+" "+$('#selectTime').val(),
				'species' : data.species,
				'sterilization' : data.sterilization,
				'weight' : data.weight,
				'doctorId' : docCode,
				'customerId' : cusId,
				'doctorName' : docName,
				'petImg' : imgSrc
			},
			success : function(data) { 
				layer.msg('已发送预约申请， 请留意返回信息', {
					icon : 16,
					time : 1000,
					shade : [ 0.5, 'gray' ]
				}, function() {
					location.href = "../../indexWeb.html";
				});
			},
			error : function(error) {
				layer.msg('已发送预约申请， 请留意返回信息', {
					icon : 16,
					time : 1000,
					shade : [ 0.5, 'gray' ]
				}, function() {
					location.href = "../../indexWeb.html";
				});
			}
		});

		return false;
	});
});
var docName = '';
var docCode = '';
var pets = [];
var choosePetData = null;
var imgSrc = '';
var doctorInfo = null;
var timeArr = [];
var selectedTime = [];
(function() {
	getCurCustomer();
	docName = parseURL("doctorName");
	docCode = parseURL("doctorCode");
	$('#docName').html(docName);
	selectPets();
	selectDoctor();
})();

function selectDoctor() {
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/DoctorServlet",
		dataType : 'json',
		async : false,
		data : {
			'type' : 'findDoctorById',
			'id' : docCode
		},
		success : function(data) {
			doctorInfo = eval(data);
			let workTime = doctorInfo[0].workTime;
			formateWorkTime(workTime);
		},
		error : function(error) {
		}
	})
}

function selectPets() {
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/PetServlet",
		dataType : 'json',
		async : false,
		data : {
			'type' : 'queryByCusCode',
			'customerCode' : cusId
		},
		success : function(data) {
			pets = eval(data);
			formatePets(pets);
		},
		error : function(error) {
		}
	})
}

function formateWorkTime(time) {
	var start = time.split('-')[0];
	var end = time.split('-')[1];

	var loopStartTime = start;
	var loopEndTime = ''; 
	while (loopStartTime !== end) {
		if (loopStartTime.split(':')[1]==='30') {
			loopEndTime = Number(Number(loopStartTime.split(':')[0])+1) +":00";
			
		} else {
			loopEndTime = loopStartTime.split(':')[0] + ":30"; 
		}
		timeArr.push(loopStartTime+"-"+loopEndTime);
		loopStartTime = loopEndTime;
	}
}

function parseURL(name) {
	var windowUrl = decodeURI(window.location.search);

	var url = windowUrl.split("?")[1];
	var para = url.split("&");
	var len = para.length;
	var res = {};
	var arr = [];
	for (var i = 0; i < len; i++) {
		arr = para[i].split("=");
		res[arr[0]] = decodeURI(arr[1]);
	}
	console.log(res[name])
	return res[name];
}
/**
 * 上传头像
 */
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
/**
 * 点击新增按钮
 */
function addPet() {
	$('#hasPet').css('display','none')
	$('#addPet').css('display','block')
}

function chooseHasPet() {
	$('#hasPet').css('display','block')
	$('#addPet').css('display','none')
}
/**
 * 填充宠物
 * @param pets
 */
function formatePets(pets) {
	
	$('#hasPet').html("");
	var text = '';
	text += '<form class="layui-form layui-from-pane" action="" target="hidden_frame" style="margin-top: 20px">' + 
			"<div class='layui-form-item text-center'>"+
			"<label class='layui-form-label'>预约日期</label>"+
			"<div class='layui-input-block' style='width: 35%;'>"+
			"<input type='text' class='layui-input' id='regisTime' autocomplete='off'"+
			"name='regisTime'>"+
			"</div>"+
			"</div>"
			+ '<div  id="selectTimeBlock" class="layui-form-item" style="display:none;">'
			+ '<label class="layui-form-label">预约时间</label>' 
			+ '<div class="layui-input-block" style="width:35%" >'
		    + '<select id="selectTime" lay-filter="selectTime" lay-verify="required"  >'
	        + '<option value="">请选择时间</option>'
	        + '</select>'
			+ '</div>' + '</div>'  
			+ '<form>'
			+ '<iframe name="hidden_frame" id="hidden_frame" style="display: none"></iframe>';
	pets.map(function(curr,index) { 
	  text += "<div class='layui-col-md3 petBlock' id=pet"+index+" onclick='choosePet("+curr.petCode+","+index+")'>" +
      "<div>" +
      "<div class='layui-col-md6'>" +
      "<img src='"+curr.petImg+"' style='width:80px;height: 80px;'>" +
      "</div>" +
      "<div class='layui-col-md6'>" +
      "<span>"+curr.nickname+"</span> <span>"+curr.age+"岁</span> <span>"+curr.species+"</span>" +
      "</div>" +
      "</div>" +
      "</div>";
	  }); 
	text +=  "<div class='layui-row'><button onclick='submitHasPet()'"+
			"class='layui-btn float-right btn-purple' style='float: left;margin-left: 35px;margin-top: 30px;'>提交</button></div>";
	$('#hasPet').append(text); 
}

/**
 * 选择已有的宠物后提交
 */
function submitHasPet(){
	var data = choosePetData;
	console.log(data);
	$.ajax({
		type : "POST",
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/RegistrationServlet",
		dataType : 'json',
		async : false,
		data : {
			'type' : 'addRegiByExistPet',
			'petCode' : data.petCode,  
			'petName' : data.nickname,
			'regisTime' : $('#regisTime').val()+" "+$('#selectTime').val(),
			'species' : data.species,  
			'doctorId' : docCode,
			'customerId' : cusId,
			'doctorName' : docName
		},
		success : function(data) { 
			layer.msg('已发送预约申请， 请留意返回信息', {
				icon : 16,
				time : 1000,
				shade : [ 0.5, 'gray' ]
			}, function() {
				location.href = "../../indexWeb.html";
			});
		},
		error : function(error) {
		}
	});
}

/*
 * 点击已有宠物
 */
function choosePet(petCode, id) { 
	$("#pet"+id).addClass('petBlockClicked');
	pets.map(function(obj, index){
		if (index!=id) {
			$("#pet"+index).removeClass('petBlockClicked');
		}else {
			choosePetData = obj;
		}
	});
}