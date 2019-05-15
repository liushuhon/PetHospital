layui.use([ 'layer', 'form', 'jquery' ], function() {
	var $ = layui.jquery, form = layui.form;
	form.render();
	var registrationCode = getUrlParam('registrationCode');
	var customerId, doctorCode, petId;
	var prescriptionCode = "";
	var medicines = [];
	var freeBeds =[];
	
	var selectMedicines = [];
	var medicineNum = [];
	var medicineType = [];
	var selectMedicineObj = [];
	var medicinePrice = 0;
	var liveInHospitalPrice = 0;
	
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
			doctorName = datas[0].doctorName;
			form.render();
		},
		error : function(error) {
			alert("cannot find!");
		}
	});

	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/MedicineServlet",
		dataType : 'json',
		data : {
			'type' : 'getAllMedicines',
		},
		success : function(data) {
			medicines = eval(data);
			medicines.map(function(obj) {
				var selectEle = document.getElementsByName('medicineSelect')[0];
				var optionObj = document.createElement("option");
				optionObj.value = obj.medicineName;
				optionObj.innerHTML = obj.medicineName;
				selectEle.appendChild(optionObj);
			});
			layui.form.render();
		},
		error : function(error) {
			alert("cannot find!");
		}
	});

	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/BedServlet",
		dataType : 'json',
		data : {
			'type' : 'getAllFreeBeds',
		},
		success : function(data) {
			freeBeds = eval(data);
			freeBeds.map(function(obj) {
				var selectEle = document.getElementById('bedNo');
				var optionObj = document.createElement("option");
				optionObj.value = obj.bedCode;
				optionObj.innerHTML = obj.bedCode;
				selectEle.appendChild(optionObj);
			});
			layui.form.render();
		},
		error : function(error) {
			alert("cannot find!");
		}
	});
	
	form.on('submit(prescribeSubmit)', function(data) {
		selectMedicinesWithType = [];
		selectMedicines = [];
		medicineNum = [];
		medicineType = [];
		selectMedicineObj = [];
		medicinePrice = 0;
		document.getElementsByName('medicineSelect').forEach(function(item) {
			selectMedicines.push(item.value);
		});
		document.getElementsByName('medicineNum').forEach(function(item, index) {
			medicineNum.push(item.value);
		});
		document.getElementsByName('medicineType').forEach(function(item,index) {
			medicineType.push(item.value);
			selectMedicineObj.push({
				name : selectMedicines[index],
				num : medicineNum[index],
				type : item.value,
			}); 
			selectMedicinesWithType.push(selectMedicines[index]+" " +medicineNum[index]+" "+item.value);
		});
		medicines.forEach(function(item) {
			selectMedicineObj.forEach(function(obj){
				if (obj.name === item.medicineName) {
					medicinePrice += Number(obj.num * item.price);
				}
			})
		})
		if ($('input[name="inHospital"]:checked ').val() === '是') {
			addToInhospital();
		} else {
			addToPescribe();
		}
	});
	
	$("#days").on("input",function(e){
		liveInHospitalPrice = e.delegateTarget.value * 50;
	});
	
	
	
	function addToInhospital() {
		// 添加新记录
		$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/SituationServlet",
		dataType : 'json',
		data : {
			'type' : 'addSituation', 
			'note' : $('#note').val()+","+selectMedicinesWithType.join(','),
			'petId' : petId,
			'doctorId' : doctorId,
			'mark' : '住院'
		},
		success : function(data) {
			alert('添加成功');
			location.href="InHospitalManage.html";
		},
		error : function(error) {
			alert("cannot find!");
		}
	}); 
			$.ajax({
				type : "POST",
				async : false,
				contentType : 'application/x-www-form-urlencoded; charset=utf-8',
				url : "/PetHospital/servlet/InHospitalServlet",
				dataType : 'json',
				data : {
					'type' : 'addInHospital',
					'customerId' : customerId,
					'petId' : petId,
					'doctorId' : doctorId,
					'bedId' : $("#bedNo").val(),
					'stayDays' : $("#days").val(),
					'hospitalPrice' : Number(liveInHospitalPrice+medicinePrice),
					'mark' : '住院',
					'petName' : $('#petName').val(),
					'cusName' : $('#customerName').val(),
					'docName' : doctorName,
					'registrationCode' : registrationCode,
				},
				success : function(data) {
					inHospitalId = data;
					addToInHospitalMiddle();
					parent.layer.msg('加载中', {
						icon : 16,
						time : 1000,
						shade : [ 0.5, 'gray' ]
					}, function() {
						location.href = "views/doctor/registration.html";
					});
//					alert('提交成功');
//					window.location.href = "registration.html";
				},
				error : function(error) {
					alert("加入住院失败!");
				}
			});
	}
	function addToPescribe() {
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/PrescribeServlet",
			dataType : 'json',
			data : {
				'types' : 'addPrescribe',
				'customerId' : customerId,
				'petId' : petId,
				'doctorId' : doctorId,
				'symptom' : $("#symptom").val(),
				'medicines' : selectMedicinesWithType.join(','),
				'registrationCode' : registrationCode,
				'note' : $("#note").val(),
				'totalPrice' : medicinePrice
			},
			success : function(data) {
				prescriptionCode = data;
				addToPrescriMiddle();
				parent.layer.msg('加载中', {
					icon : 16,
					time : 1000,
					shade : [ 0.5, 'gray' ]
				}, function() {
					location.href = "views/doctor/registration.html";
				});
//				window.location.href = "registration.html";
			},
			error : function(error) {
				alert("cannot find!");
			}
		});
	}
	
	function addToPrescriMiddle() {
		selectMedicineObj.map(function(obj1, index) {
			medicines.map(function(obj2, index) {
				if (obj1.name === obj2.medicineName) {
					$.ajax({
						type : "POST",
						async : false,
						contentType : 'application/x-www-form-urlencoded; charset=utf-8',
						url : "/PetHospital/servlet/MediMiddlePrescriServlet",
						dataType : 'json',
						data : {
							'type' : 'addMiddle',
							'medicineId' : obj2.medicineCode,
							'prescriptionId' : prescriptionCode,
							'number' : obj1.num
						},
						error : function(error) {
							alert("cannot find!");
						}
					});
				}
			});
		})
	}
	function addToInHospitalMiddle() {
		selectMedicineObj.map(function(obj1, index) {
			medicines.map(function(obj2, index) {
				if (obj1.name === obj2.medicineName) {
					$.ajax({
						type : "POST",
						async : false,
						contentType : 'application/x-www-form-urlencoded; charset=utf-8',
						url : "/PetHospital/servlet/MediMiddleInHospitalServlet",
						dataType : 'json',
						data : {
							'type' : 'addMiddle',
							'medicineId' : obj2.medicineCode,
							'inHospitalId' : inHospitalId,
							'number' : obj1.num
						},
						error : function(error) {
							alert("cannot find!");
						}
					});
				}
			});
		})

 

	}
	form.on('radio(inHospital)', function(data){
		 if (data.value === '是') {
			$('#staysDays').show();
			$('#selectNoArea').show();
		} else {
			$('#staysDays').hide();
			$('#selectNoArea').hide();
		}
	}); 
	

	form.on('submit(back)', function(data) {
		location.href = "registration.html"
	});

	/**
	 * 删除药品清单
	 */
	$(document).on('click', '#deleteMedicine', function(e) {
		var outsideEle = document.getElementById('medicineList');
		var delNode = e.currentTarget.parentNode.parentNode.parentNode.parentNode;
		outsideEle.removeChild(delNode);
	})

	/**
	 * 添加药品清单
	 */
	$(document).on('click','#addMedicineSelect',function() {
				var selectArea = $("#medicineList");
				var html = '<div class="layui-col-md8 layui-form-item">' + '<div id="search" class="layui-col-space20 layui-input-block">' + '<div class="layui-col-md5">'
						+ '<select name="medicineSelect" lay-verify="" lay-search>' + '</select>' + '</div>' + '<div class="layui-col-md3" style="display: flex;">'
						+ '<input name="medicineNum" type="text" class="layui-input">' + '<select ' + 'name="medicineType" style="width: 23%" lay-verify="" lay-search>'
						+ '<option value="支">支</option>' + '<option value="盒">盒</option>' + '<option value="片" selected>片</option>' + '</select>' + '</div>'
						+ '<div class="layui-col-md3">' + '<div class="layui-btn-group">' + '<button id="deleteMedicine" class="layui-btn layui-btn-primary layui-btn-sm">'
						+ '<i class="layui-icon">&#xe640;</i>' + '</button>' + '</div>' + '</div>' + '</div>' + '</div>';

				selectArea.append(html);
				medicines.map(function(obj) {
					var selectEle = document.getElementsByName('medicineSelect')[document.getElementsByName('medicineSelect').length - 1];
					var optionObj = document.createElement("option");
					optionObj.value = obj.medicineName;
					optionObj.innerHTML = obj.medicineName;
					selectEle.appendChild(optionObj);
				});
				layui.form.render();
			});
})