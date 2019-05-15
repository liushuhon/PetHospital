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
		type : 'datetime',
		min : 0,
		max : 7,
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
				'regisTime' : data.regisTime,
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
(function() {
	getCurCustomer();
	docName = parseURL("doctorName");
	docCode = parseURL("doctorCode");
	$('#docName').html(docName);
	selectPets();
})();

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
	text += "<div class='layui-form-item text-center'>"+
			"<label class='layui-form-label'>预约时间</label>"+
			"<div class='layui-input-block'>"+
			"<input type='text' class='layui-input' id='regisTime' autocomplete='off'"+
			"name='regisTime'>"+
			"</div>"+
			"</div>";
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
			'regisTime' : $('#regisTime').val(),
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