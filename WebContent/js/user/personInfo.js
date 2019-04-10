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
})();

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
	for (var i = 1; i <= 4; i++) {
		if (idx == i) {
			document.getElementById("TD" + i).className = "tabSelect";
			document.getElementById("block" + i).style = "display:block;";
		} else {
			document.getElementById("TD" + i).className = "tabUnSelect";
			document.getElementById("block" + i).style = "display:none;";
		}
	}
}
