layui.use(['layer','form','jquery'],function(){
	
	var $ = layui.jquery,form = layui.form;
	var inHospitalId = getUrlParam('inHosid');
	var petId = null;
	
	var selectMedicines = [];
	var medicineNum = [];
	var medicineType = [];
	var selectMedicineObj = [];
	var medicinePrice = 0;
	var liveInHospitalPrice = 0;
	var inhospitalId = '';
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/InHospitalServlet",
		dataType : 'json',
		data : {
			'type' : 'selectById', 
			'id' : inHospitalId
		},
		success : function(data) {
			datas = eval(data);
			$("#customerName").html(datas[0].cusName);
			$("#petName").html(datas[0].petName);
			petId = datas[0].petId;
			doctorId = datas[0].doctorId;
			inhospitalId = datas[0].id;
			medicinePrice = datas[0].hospitalPrice
		},
		error : function(error) {
			alert("cannot find!");
		}
	}); 
	// 获得病情列表
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/SituationServlet",
		dataType : 'json',
		data : {
			'type' : 'selectByPetId', 
			'petId' : petId,
			'mark' : '住院'
		},
		success : function(data) {
			datas = eval(data);    
			console.log(datas);
			formateSituation(datas);
		},
		error : function(error) {
			alert("cannot find!");
		}
	}); 
	// 填充下拉框
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
	
	
	form.on('submit(goInHospital)',function(data){
		 location.href="InHospitalManage.html";
	});
	form.on('submit(situationSubmit)',function(data){
		// 板蓝根一盒
		selectMedicinesWithType = [];
		// 板蓝根
		selectMedicines = [];
		// 1
		medicineNum = [];
		// 盒
		medicineType = [];
		// {板蓝根 1 盒}
		selectMedicineObj = [];
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
		
		
		console.log(data)
		// 添加新记录
		$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/SituationServlet",
		dataType : 'json',
		data : {
			'type' : 'addSituation', 
			'note' : $('#newNote').val()+","+selectMedicinesWithType.join(','),
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
		// 住院总价钱加上
		$.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/InHospitalServlet",
			dataType : 'json',
			data : {
				'type' : 'updatePrice',
				'id' : inHospitalId,
				'newPrice' : medicinePrice,
			},
			success : function(data) {
			},
			error : function(error) {
				alert("加钱失败!");
			}
		});
		// 添加住院的药方清单
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
						success : function(data) {
						},
						error : function(error) {
							alert("添加药品清单失败!");
						}
					});
				}
			});
		})
		
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
						+ '<select name="medicineSelect" lay-verify="" lay-search> <option value="">请选择药品</option>' + '</select>' + '</div>' + '<div class="layui-col-md3" style="display: flex;">'
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
	
	function formateSituation(datas) {
		var area = $('#historySituation');
		var html = '';
		datas.forEach(function(item) {
			html += '<p ><span>'+item.date+'</span>  <span>'+item.note+'</span></p>';
		});
		area.append(html);
	}
	
})