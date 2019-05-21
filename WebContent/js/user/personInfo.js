var personinfo = null;
var imgSrc = '';

layui.use([ 'element', 'form', 'layer', 'table' ], function() {
	var form = layui.form, element = layui.element, layer = layui.layer, table = layui.table;
	form.render();

	/**
	 * 增加宠物
	 */
	$(document).on('click','#addPet',function(){
		layui.form.render();
		layer.open({
			type : 1,
			title : "修改宠物信息",
			area : [ '50%','90%'],
			content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">宠物照片</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="file"'
                        + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
                         +'id="xxFile"'
                        + 'style="position:absolute;clip:rect(0 0 0 0);"'
                        + 'onchange="uploadPetPhoto()">'
					+'<label class="upload-button"'
                        + 'for="xxFile">'
                     +'<img id="petPhoto" src="../../assets/images/moren.jpg" style="border-radius: 10px;" alt="">'
                 + '</label> ' 
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">宠物昵称</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="nickname" id="nickname" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物昵称" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">性别</label>' 
					+'<div class="layui-input-block">'
					+'<input type="radio" name="gender" value="雄" title="雄"> <input '
						+'type="radio" name="gender" value="雌" title="雌" checked> '
					
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">年龄</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="age" id="age" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物年龄" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">体重</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="weight" id="weight" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物体重/kg" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">种类</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="species" id="species" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物种类" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">颜色</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="color" id="color" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物颜色" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">是否绝育</label>' 
					+'<div class="layui-input-block">'
					+'<input type="radio" name="immunity" value="是" title="是"> <input '
						+'type="radio" name="immunity" value="否" title="否" checked> '
					
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">是否免疫</label>' 
					+'<div class="layui-input-block">'
					+'<input type="radio" name="sterilization" value="是" title="是"> <input '
					+'type="radio" name="sterilization" value="否" title="否" checked> '
					+ '</div>' + '</div>' 
					+ '</form>',
			btn : [ '确定', '取消' ],
			success : function(layero, index) { 
				layui.form.render();  
			},
			yes : function(index, layero) {
				$.ajax({
					url : '/PetHospital/servlet/PetServlet',
					type : 'POST',
					data : {
						type : 'addPet', 
						nickname : layero.find("#nickname").val(),
						age : layero.find("#age").val(),
						weight : layero.find("#weight").val(),
						species : layero.find("#species").val(),
						color : layero.find("#color").val(),
						sterilization : $('input[name="sterilization"]:checked ').val(),
						immunity : $('input[name="immunity"]:checked ').val(),
						gender : $('input[name="gender"]:checked ').val(),
						photo : layero.find("#petPhoto")[0].currentSrc, 
						masterId : cusId
					},
					success : function(msg) {
						layer.closeAll();
						refreashTable('allPet');
					},
					error : function(msg) {
						layer.closeAll();
					}
				})
				
				
			}
    }); 
	});
	/**
	 * 修改密码
	 */
	form.on('submit(updatePwd)', function(data) {
		var customer = data.field;
		if (customer.rePwd !== cusPassword) {
			layer.msg('旧密码输入错误！', {
				icon : 2
			})
		} else {
			$.ajax({
				url : "/PetHospital/servlet/CustomerServlet",
				type : "POST",
				data : {
					type : 'updatePwdByCode',
					cusCode : cusId,
					password : customer.pwd
				},
				success : function(data) {
					layer.msg('修改成功，请重新登录', {
						icon : 1,
						time : 1500,
						shade : [ 0.5, 'gray' ]
					}, function() {
						location.href = "login.html";
					});
					layui.form.render();
				},
				error : function(data) {

				}
			});
		}
	});
	/***
	 * 修改信息
	 */
	form.on('submit(editPerson)', function(data) {
		var customer = data.field;
		$.ajax({
			url : "/PetHospital/servlet/CustomerServlet",
			type : "POST",
			data : {
				type : 'updateByCode',
				cusCode : cusId,
				phone : customer.phone,
				address : customer.address,
				gender : customer.gender,
				userName : customer.userName
			},
			success : function(data) {
				layer.msg('修改成功', {
					icon : 1
				})
				layui.form.render();
			},
			error : function(data) {

			}
		});
	})
	/**
	 * 验证
	 */
	form.verify({
		pwd : [ /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格' ],
		ppwd : function(value, item) { // value：表单的值、item：表单的DOM对象
			console.log($('#pwd').val())
			if (value !== $('#pwd').val()) {
				return '请输入相同的密码';
			}
		}
	});
	
	/**
	 * 领养宠物管理
	 */
	table.on('tool(adopt)', function(obj) { 
		layui.form.render(); 
		var data = obj.data;  
		if (obj.event === 'edit') {
			layui.form.render();
			layer.open({
				type : 1,
				title : "修改宠物信息",
				area : [ '50%','90%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物照片</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="file"'
                            + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
                             +'id="xxFile"'
                            + 'style="position:absolute;clip:rect(0 0 0 0);"'
                            + 'onchange="uploadPetPhoto()">'
						+'<label class="upload-button"'
                            + 'for="xxFile">'
                         +'<img id="petPhoto" src="'+data.photo+'" style="border-radius: 10px;" alt="">'
                     + '</label> '
						 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">宠物编号</label>' 
						+ '<div class="layui-input-block">' 
						+ '<input type="text" name="adoptPetCode" id="adoptPetCode" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input gray" style="width:80%">' 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物昵称</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="nickname" id="nickname" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物昵称" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">年龄</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="age" id="age" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物年龄" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">体重</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="weight" id="weight" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物体重/kg" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">种类</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="species" id="species" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物种类" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">颜色</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="color" id="color" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物颜色" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">是否绝育</label>' 
						+'<div class="layui-input-block">'
						+'<input type="radio" name="immunity" value="是" title="是"> <input '
							+'type="radio" name="immunity" value="否" title="否" checked> '
						
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">是否免疫</label>' 
						+'<div class="layui-input-block">'
						+'<input type="radio" name="sterilization" value="是" title="是"> <input '
						+'type="radio" name="sterilization" value="否" title="否" checked> '
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index ) {
					layero.find("#adoptPetCode").val(data.adoptPetCode);
					layero.find("#nickname").val(data.nickname);
					layero.find("#age").val(data.age);
					layero.find("#weight").val(data.weight);
					layero.find("#species").val(data.species);
					layero.find("#color").val(data.color);
					$("input[name='sterilization'][value='是']").attr("checked", data.sterilization == '是' ? true : false);
					$("input[name='sterilization'][value='否']").attr("checked", data.sterilization == '否' ? true : false);
					$("input[name='immunity'][value='是']").attr("checked", data.sterilization == '是' ? true : false);
					$("input[name='immunity'][value='否']").attr("checked", data.sterilization == '否' ? true : false);
					layui.form.render();  
				},
				yes : function(index, layero) {
					$.ajax({
						url : '/PetHospital/servlet/AdoptPetServlet',
						type : 'POST',
						data : {
							type : 'updatePetByCode',
							adoptPetCode : layero.find("#adoptPetCode").val(),
							nickname : layero.find("#nickname").val(),
							age : layero.find("#age").val(),
							weight : layero.find("#weight").val(),
							species : layero.find("#species").val(),
							color : layero.find("#color").val(),
							sterilization : $('input[name="sterilization"]:checked ').val(),
							immunity : $('input[name="immunity"]:checked ').val(),
							photo : layero.find("#petPhoto")[0].currentSrc,
							state : '已领养'
						},
						success : function(msg) {
							layer.closeAll();
							refreashTable('adoptPet');
							layui.form.render();
						},
						error : function(msg) {
							layer.closeAll();
							refreashTable('adoptPet');
							layui.form.render();
						}
					})
					layui.form.render();
				},
				cancel : function(index, layero) {
					layer.close(index);
				},
				end : function() {
					table.reload('adoptPet', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllByMaster', 
							masterId : cusId
						},
						url : '/PetHospital/servlet/AdoptPetServlet',
						method : 'post'
					});
					layui.form.render();
				}
				
			});
		}
	});
	/**
	 * 住院病历单
	 */
	table.on('tool(inHospitalTab)', function(obj) {
		var data = obj.data;  
		$.ajax({
			url : "/PetHospital/servlet/DoctorServlet",
			type : "POST",
			async : false,
			data : {
				type : 'findDoctorByCode',
				code : data.doctorId,
			},
			success : function(msg) {
				var datas = eval(msg);
				console.log(datas)
				$('#phones').html(datas[0].phone);
				$.ajax({
					url : "/PetHospital/servlet/PetServlet",
					type : "POST",
					async : false,
					data : {
						type : 'selectByPetId',
						petId : data.petId,
					},
					success : function(msg) {
						var datas = eval(msg);
						console.log(datas)
						$('#weight1').html(datas[0].weight);
					}
				});
			}
		});
		
		$.ajax({
			url : "/PetHospital/servlet/SituationServlet",
			type : "POST",
			async : false,
			data : {
				type : 'selectByPetId',
				petId : data.petId,
				mark : '住院'
			},
			success : function(msg) {
				var datas = eval(msg);
				var area = $('#historySituation1');
				var html = '';
				datas.forEach(function(item) {
					html += '<p ><span>'+item.date+'</span>  <span>'+item.note+'</span></p>';
				});
				area.append(html);
			}
		});
		$('#inHospital').css('display','none');
		$('#in-detail').css('display','block');
		$('#docName1').html(data.docName);
		
		$('#petName1').html(data.petName);
		$('#stayDays1').html(data.stayDays);
		$('#mark1').html(data.mark);
//		$('#totalPrice').html(data.totalPrice);
//		$('#date').html(data.date);
	});
	/**
	 * 出院病历单
	 */
	table.on('tool(outHospitalTab)', function(obj) {
		var data = obj.data;  
		$.ajax({
			url : "/PetHospital/servlet/DoctorServlet",
			type : "POST",
			async : false,
			data : {
				type : 'findDoctorByCode',
				code : data.doctorId,
			},
			success : function(msg) {
				var datas = eval(msg);
				console.log(datas)
				$('#phones').html(datas[0].phone);
				$.ajax({
					url : "/PetHospital/servlet/PetServlet",
					type : "POST",
					async : false,
					data : {
						type : 'selectByPetId',
						petId : data.petId,
					},
					success : function(msg) {
						var datas = eval(msg);
						console.log(datas)
						$('#weight').html(datas[0].weight);
					}
				});
			}
		});
		
		$.ajax({
			url : "/PetHospital/servlet/SituationServlet",
			type : "POST",
			async : false,
			data : {
				type : 'selectByPetId',
				petId : data.petId,
				mark : '出院'
			},
			success : function(msg) {
				var datas = eval(msg);
				var area = $('#historySituation');
				var html = '';
				datas.forEach(function(item) {
					html += '<p ><span>'+item.date+'</span>  <span>'+item.note+'</span></p>';
				});
				area.append(html);
			}
		});
		$('#outHospital').css('display','none');
		$('#out-detail').css('display','block');
		$('#docName').html(data.docName);
		
		$('#petName').html(data.petName);
		$('#stayDays').html(data.stayDays);
		$('#mark').html(data.mark);
//		$('#totalPrice').html(data.totalPrice);
//		$('#date').html(data.date);
	});
	/**
	 * 历史药方
	 */
	table.on('tool(prescribeTab)', function(obj) {
		var data = obj.data;  
		console.log(data);
		$('#prescribe-container').css('display','none');
		$('#prescribeDetail').css('display','block');
		$('#nickname').html(data.nickname);
		$('#age').html(data.age);
		$('#doctorName').html(data.doctorName);
		$('#docPhone').html(data.docPhone);
		$('#symptom').html(data.symptom);
		$('#medicines').html(data.medicines);
		$('#note').html(data.note);
		$('#totalPrice').html(data.totalPrice);
		$('#date').html(data.date);
	});
	
	/**
	 * 待付款药方
	 */ 
	table.on('tool(unpayTab)', function(obj) {
		var data = obj.data;   
		console.log(data);
		$('#unpay-container').css('display','none');
		$('#unPayDetail').css('display','block');
		$('#uPetId').html(data.petId);
		$('#unickname').html(data.nickname);
		$('#uage').html(data.age);
		$('#udoctorName').html(data.doctorName);
		$('#udocPhone').html(data.docPhone);
		$('#usymptom').html(data.symptom);
		$('#umedicines').html(data.medicines);
		$('#unote').html(data.note);
		$('#utotalPrice').html(data.totalPrice);
		$('#udate').html(data.date);
	});
	
	/***
	 * 所有宠物管理
	 */
	table.on('tool(demo)', function(obj) { 
		layui.form.render(); 
		var data = obj.data;  
		if (obj.event === 'delete') {
			layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/PetServlet",
					type : "POST",
					data : {
						type : 'deleteByCode',
						petCode : data.petCode,
					},
					success : function(msg) {
						if (msg == 'true') {
							// 删除这一行
							// 关闭弹框
							parent.layer.close(index);
							parent.layer.msg("删除成功", {
								icon : 6
							});
							refreashTable('allPet');
						} else {
							parent.layer.msg("删除失败", {
								icon : 5
							});
						}
					}
				});
				return false;
			});
		} else if (obj.event === 'edit') { 
			layui.form.render();
			layer.open({
				type : 1,
				title : "修改宠物信息",
				area : [ '50%','90%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物照片</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="file"'
                            + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
                             +'id="xxFile"'
                            + 'style="position:absolute;clip:rect(0 0 0 0);"'
                            + 'onchange="uploadPetPhoto()">'
						+'<label class="upload-button"'
                            + 'for="xxFile">'
                         +'<img id="petPhoto" src="'+data.petImg+'" style="border-radius: 10px;" alt="">'
                     + '</label> '
						 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">宠物编号</label>' 
						+ '<div class="layui-input-block">' 
						+ '<input type="text" name="petCode" id="petCode" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input gray" style="width:80%">' 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物昵称</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="nickname" id="nickname" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物昵称" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">年龄</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="age" id="age" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物年龄" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">体重</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="weight" id="weight" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物体重/kg" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">种类</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="species" id="species" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物种类" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">颜色</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="color" id="color" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入宠物颜色" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">是否绝育</label>' 
						+'<div class="layui-input-block">'
						+'<input type="radio" name="immunity" value="是" title="是"> <input '
							+'type="radio" name="immunity" value="否" title="否" checked> '
						
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">是否免疫</label>' 
						+'<div class="layui-input-block">'
						+'<input type="radio" name="sterilization" value="是" title="是"> <input '
						+'type="radio" name="sterilization" value="否" title="否" checked> '
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					layero.find("#petCode").val(data.petCode);
					layero.find("#nickname").val(data.nickname);
					layero.find("#age").val(data.age);
					layero.find("#weight").val(data.weight);
					layero.find("#species").val(data.species);
					layero.find("#color").val(data.color);
					$("input[name='sterilization'][value='是']").attr("checked", data.sterilization == '是' ? true : false);
					$("input[name='sterilization'][value='否']").attr("checked", data.sterilization == '否' ? true : false);
					$("input[name='immunity'][value='是']").attr("checked", data.sterilization == '是' ? true : false);
					$("input[name='immunity'][value='否']").attr("checked", data.sterilization == '否' ? true : false);
					layui.form.render();  
				},
				yes : function(index, layero) {
					/**
					 * 修改领养宠物
					 */
					if ((data.state).indexOf('领养')!= -1) {
						$.ajax({
							url : '/PetHospital/servlet/AdoptPetServlet',
							type : 'POST',
							data : {
								type : 'updatePetByCode',
								adoptPetCode : layero.find("#adoptPetCode").val(),
								nickname : layero.find("#nickname").val(),
								age : layero.find("#age").val(),
								weight : layero.find("#weight").val(),
								species : layero.find("#species").val(),
								color : layero.find("#color").val(),
								sterilization : $('input[name="sterilization"]:checked ').val(),
								immunity : $('input[name="immunity"]:checked ').val(),
								photo : layero.find("#petPhoto")[0].currentSrc,
								state : '已领养'
							},
							success : function(msg) {
								layer.closeAll();
								layui.form.render();
							},
							error : function(msg) {
								layer.closeAll();
								layui.form.render();
							}
						})
					} 
					/**
					 * 修改非领养宠物
					 */
						else {
							$.ajax({
								url : '/PetHospital/servlet/PetServlet',
								type : 'POST',
								data : {
									type : 'updatePetByCode',
									petCode : layero.find("#petCode").val(),
									nickname : layero.find("#nickname").val(),
									age : layero.find("#age").val(),
									weight : layero.find("#weight").val(),
									species : layero.find("#species").val(),
									color : layero.find("#color").val(),
									sterilization : $('input[name="sterilization"]:checked ').val(),
									immunity : $('input[name="immunity"]:checked ').val(),
									photo : layero.find("#petPhoto")[0].currentSrc, 
								},
								success : function(msg) {
									layer.closeAll();
								},
								error : function(msg) {
									layer.closeAll();
								}
							})
					}
					
				},
				cancel : function(index, layero) {
					layer.close(index);
				},
				end : function() {
					table.reload('allPet', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllByMaster', 
							masterId : cusId
						},
						url : '/PetHospital/servlet/PetServlet',
						method : 'post'
					});
				}
			}); 
		}
	});  

});

(function() {
	getCurCustomer();
	getPersonInfo();
	getAllPets();
	getAdoptPets();
	getToBeConfirmRegis();
	getConfirmedRegis();
	getDealedRegis();
	getPrescribe();
	getUnpayPrescription();
	getOutHospital();
	getInHospital();
	getAdoptApplication();
})();
/**
 * 获取管理员反馈
 */
function getAdoptApplication(){
	layui.table.render({
		elem : '#adoptApplication',
		id : 'adoptApplication',
		url : '/PetHospital/servlet/AdoptApplicationServlet',
		where : {
			type : 'queryAllAppByCus',
			customerId : cusId,
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'id',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物',
		}, {
			field : 'species',
			title : '种类',
		}, {
			field : 'age',
			title : '年龄/岁',
		}, {
			field : 'weight',
			title : '体重/Kg',
		}, {
			field : 'date',
			title : '日期',
		},{
			field : 'state',
			title : '反馈',
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}

/**
 * 未出院
 */
function getInHospital(){
	layui.table.render({
		elem : '#inHospitalTab',
		id : 'inHospitalTab',
		url : '/PetHospital/servlet/InHospitalServlet',
		where : {
			type : 'selectByCusId',
			customerId : cusId,
			mark : '住院'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'id',
			title : '编号',
			sort : true
		}, {
			field : 'petName',
			title : '宠物',
		}, {
			field : 'docName',
			title : '医生',
		}, {
			field : 'stayDays',
			title : '住院天数',
		}, {
			field : 'bedId',
			title : '病床',
		},{
			field : 'mark',
			title : '状态',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#inHospitalTool'
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}
/**
 * 已出院
 */
function getOutHospital(){
	layui.table.render({
		elem : '#outHospitalTab',
		id : 'outHospitalTab',
		url : '/PetHospital/servlet/InHospitalServlet',
		where : {
			type : 'selectByCusId',
			customerId : cusId,
			mark : '出院'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'id',
			title : '编号',
			sort : true
		}, {
			field : 'petName',
			title : '宠物',
		}, {
			field : 'docName',
			title : '医生',
		}, {
			field : 'stayDays',
			title : '住院天数',
		}, {
			field : 'hospitalPrice',
			title : '总价',
		},{
			field : 'mark',
			title : '状态',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#outHospitalTool'
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}
/**
 * 未付款的药方
 */
function getUnpayPrescription(){
	layui.table.render({
		elem : '#unpayTab',
		id : 'unpayTab',
		url : '/PetHospital/servlet/PrescribeServlet',
		where : {
			types : 'queryAllPrescribeByCus',
			customerId : cusId,
			state : '待付款'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'prescriptionCode',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物',
		}, {
			field : 'doctorName',
			title : '医生',
		}, {
			field : 'medicines',
			title : '药物',
		}, {
			field : 'totalPrice',
			title : '总价',
		}, {
			field : 'state',
			title : '状态',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#unpayTool'
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}

/**
 * 药方
 */
function getPrescribe(){
	layui.table.render({
		elem : '#prescribeTab',
		id : 'prescribeTab',
		url : '/PetHospital/servlet/PrescribeServlet',
		where : {
			types : 'queryAllPrescribeByCus',
			customerId : cusId,
			state : '已付款'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'prescriptionCode',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物',
		}, {
			field : 'doctorName',
			title : '医生',
		}, {
			field : 'medicines',
			title : '药物',
		}, {
			field : 'totalPrice',
			title : '总价',
		}, {
			field : 'state',
			title : '状态',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#prescribeTool'
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}

/**
 * 已处理的订单
 */
function getDealedRegis() {
	layui.table.render({
		elem : '#completedRegi',
		id : 'completedRegi',
		url : '/PetHospital/servlet/RegistrationServlet',
		where : {
			type : 'findRegistrationByCustId',
			customerId : cusId,
			state : '已处理'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'registrationCode',
			title : '编号',
			width : 80,
			sort : true
		}, {
			field : 'customerName',
			title : '主人姓名',
			width : 120
		}, {
			field : 'customerPhone',
			title : '手机号码',
			minWidth : 120
		}, {
			field : 'petName',
			title : '宠物姓名',
			minWidth : 80
		}, {
			field : 'category',
			title : '宠物类别',
			minWidth : 80
		}, {
			field : 'regisTime',
			title : '处理时间',
			width : 200
		}, {
			field : 'state',
			title : '状态',
			width : 100
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}
/**
 * 预约成功的订单
 */
function getConfirmedRegis() {
	layui.table.render({
		elem : '#confirmedRegi',
		id : 'confirmedRegi',
		url : '/PetHospital/servlet/RegistrationServlet',
		where : {
			type : 'findRegistrationByCustId',
			customerId : cusId,
			state : '预约成功'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'registrationCode',
			title : '编号',
			width : 80,
			sort : true
		}, {
			field : 'customerName',
			title : '主人姓名',
			width : 120
		}, {
			field : 'customerPhone',
			title : '手机号码',
			minWidth : 120
		}, {
			field : 'petName',
			title : '宠物姓名',
			minWidth : 80
		}, {
			field : 'category',
			title : '宠物类别',
			minWidth : 80
		}, {
			field : 'regisTime',
			title : '就诊时间',
			width : 200
		}, {
			field : 'state',
			title : '状态',
			width : 100
		} ] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}
/**
 * 待确认的订单
 */
function getToBeConfirmRegis(){
	layui.table.render({
		elem : '#toBeConfirmedRegi',
		id : 'toBeConfirmedRegi',
		url : '/PetHospital/servlet/RegistrationServlet',
		where : {
			type : 'findRegistrationByCustId',
			customerId : cusId,
			state : '待处理'
		},
		request : {
			pageName : 'curr' // 页码的参数名称，默认：page
			,
			limitName : 'nums' // 每页数据量的参数名，默认：limit
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		cols : [ [ // 标题栏
		{
			field : 'registrationCode',
			title : '编号',
			sort : true
		}, {
			field : 'customerName',
			title : '主人姓名',
		}, {
			field : 'customerPhone',
			title : '手机号码',
			width : 130
		}, {
			field : 'petName',
			title : '宠物姓名',
		}, {
			field : 'category',
			title : '宠物类别',
		}, {
			field : 'regisTime',
			title : '预约时间',
			width : 180
		}, {
			field : 'state',
			title : '状态',
		}] ], 
		skin : 'line' // 表格风格
		,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
		}
	});
}
/**
 * 领养宠物
 */
function getAdoptPets(){ 
		layui.table.render({
			elem : '#adoptPet',
			id : 'adoptPet',
			url : '/PetHospital/servlet/AdoptPetServlet',
			where : {
				type : 'queryAllByMaster', 
					masterId : cusId
			},
			method : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			request : {
				pageName : 'curr',
				limitName : 'nums',
			},
			cols : [ [ // 标题栏
			{
				field : 'adoptPetCode',
				title : '编号',
				align:'center', 
				sort : true
			}, {
				field : 'nickname',
				title : '宠物昵称',
				align:'center',
			}, {
				field : 'age',
				title : '年龄/岁',
				align:'center',
			}, {
				field : 'gender',
				title : '性别',
				align:'center',
			}, {
				field : 'species',
				title : '宠物类别',
				align:'center',
			}, {
				field : 'operate',
				title : '操作',
				align : 'center',
				toolbar : '#adoptPetTool',
			} ] ], 
			skin : 'line',
			page : true,
			limits : [ 5, 7, 10 ],
			limit : 5,
			response : {
				statusName : 'code',
				statusCode : 0 ,
				msgName : 'msg',
				countName : 'count',
				dataName : 'data' 
			}
		});
	
}


/**
 * 所有宠物
 */
function getAllPets() {
	layui.table.render({
		elem : '#allPet',
		id : 'allPet',
		url : '/PetHospital/servlet/PetServlet',
		where : {
			type : 'queryAllByMaster', 
				masterId : cusId
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums',
		},
		cols : [ [ // 标题栏
		{
			field : 'petCode',
			title : '编号',
			align:'center', 
			sort : true
		}, {
			field : 'nickname',
			title : '宠物昵称',
			align:'center',
		}, {
			field : 'age',
			title : '年龄/岁',
			align:'center',
		}, {
			field : 'gender',
			title : '性别',
			align:'center',
		}, {
			field : 'species',
			title : '宠物类别',
			align:'center',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#petTool',
		} ] ], 
		skin : 'line',
		page : true,
		limits : [ 5, 7, 10 ],
		limit : 5,
		response : {
			statusName : 'code',
			statusCode : 0 ,
			msgName : 'msg',
			countName : 'count',
			dataName : 'data' 
		}
	});
}

function getPersonInfo() {
	$.ajax({
		url : "/PetHospital/servlet/CustomerServlet",
		type : "POST",
		data : {
			type : 'queryByCode',
			code : cusId
		},
		success : function(data) {
			var data = JSON.parse(data);
			personinfo = data;
			$('#phone').val(data.phone);
			$('#userName').val(data.userName);
			$('#address').val(data.address);
			$("input[name='gender'][value='男']").attr("checked", data.gender == '男' ? true : false);
			$("input[name='gender'][value='女']").attr("checked", data.gender == '女' ? true : false);

			layui.form.render();
		},
		error : function(data) {

		}
	});
}
function uploadPetPhoto() {
	var input = $("#xxFile");
	var file = input[0].files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var txt = event.target.result;
		var img = $("#petPhoto");
		imgSrc = txt;
		img.attr('src',imgSrc);
		
	} 
	reader.readAsDataURL( file );
}
function uploadPhoto() {
	var valid = true;
	var input = $("#xFile");
	var file = input[0].files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var acceptTypes = [ 'image/jpeg', 'image/jpg', 'image/png' ];
		var size = event.total;
		if (size >= 1024 * 50) {
			layer.msg('照片太大', {
				icon : 2
			});
			valid = false;
		}
		if (valid) {
			var txt = event.target.result;
			var img = $("#photo");
			imgSrc = txt;
			img.attr('src', imgSrc);
			$.ajax({
				url : "/PetHospital/servlet/CustomerServlet",
				type : "POST",
				data : {
					type : 'updatePhotoByCode',
					cusCode : cusId,
					photo : txt
				},
				success : function(data) {
					layer.msg('修改成功', {
						icon : 1
					});
					layui.form.render();
				},
				error : function(data) {

				}
			});
		}
	}
	reader.readAsDataURL(file);
}

function clickAvatar() {
	var img = $("#photo");
	imgSrc = personinfo.photo;
	img.attr('src', imgSrc);
}

function clickPassword() {
	var rePwd = $('#rePwd').val('');
	var rePwd = $('#pwd').val('');
	var rePwd = $('#ppwd').val('');
}

function clickAvatarBtn() {
	$('#xFile').click();
}
function refreashTable(table) {
	if (table === 'allPet') {
		layui.table.reload(table, {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllByMaster',
				masterId : cusId
			},
			url : '/PetHospital/servlet/PetServlet',
			method : 'post'
		});
	}else if (table === 'adoptPet') {
		layui.table.reload(table, {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllByMaster',
				masterId : cusId
			},
			url : '/PetHospital/servlet/AdoptPetServlet',
			method : 'post'
		});
	}
	
}
function checkTab(idx) {
	for (var i = 1; i <= 6; i++) {
		if (idx == i) {
			document.getElementById("TD" + i).className = "tabSelect";
			document.getElementById("block" + i).style = "display:block;";
		} else {
			document.getElementById("TD" + i).className = "tabUnSelect";
			document.getElementById("block" + i).style = "display:none;";
		}
	}
	if (idx === 1) {
		getPersonInfo();
	}else if (idx === 2) {
		getAllPets();
		getAdoptPets();
	}else if (idx === 3) {
		getToBeConfirmRegis();
		getConfirmedRegis();
		getDealedRegis();
	}else if (idx === 4) {
		getPrescribe();
		getUnpayPrescription();
	}else if (idx === 5) {
		getOutHospital();
		getInHospital();
	}else {
		getAdoptApplication();
	}
}

function payPrescrib() {
	$.ajax({
		url : "/PetHospital/servlet/PrescribeServlet",
		type : "POST",
		async : false,
		data : {
			types : 'changeState',
			petId : $('#uPetId').html()
		},
		success : function(msg) {
			alert('付款成功');
			getPrescribe();
			getUnpayPrescription();
		}
	});
	$('#unPayDetail').css('display','none');
	$('#unpay-container').css('display','block');
}
function returnUnpay() {
	$('#unPayDetail').css('display','none');
	$('#unpay-container').css('display','block');
}
function returnPrescribe() {
	$('#prescribeDetail').css('display','none');
	$('#prescribe-container').css('display','block');
}
function returnHospital() {
	$('#out-detail').css('display','none');
	$('#outHospital').css('display','block');
}
function returnInHospital() {
	$('#in-detail').css('display','none');
	$('#inHospital').css('display','block');
}