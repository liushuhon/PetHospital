layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	// 展示已知数据
	table.render({
		elem : '#petTable',
		id : 'petTable',
		url : '/PetHospital/servlet/AdoptPetServlet',
		where : {
			type : 'queryAllPet',
			state : '待领养'
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'adoptPetCode',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物昵称',
		}, {
			field : 'gender',
			title : '雌雄',
		}, {
			field : 'species',
			title : '种类',
		}, {
			field : 'species',
			title : '宠物类别',
		}, {
			field : 'state',
			title : '状态',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			width : 200,
			toolbar : '#petTool'
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

	var active = {
		reload : function() {
			var selContent = $('#selContent').val();// 获取输入框的值
			var selItem = $("#select").val();
			// 执行重载
			table.reload('petTable', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectPet', 
					selContent : selContent,
					selItem : selItem,
					state : '待领养'
				},// 这里传参 向后台
				url : '/PetHospital/servlet/AdoptPetServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	table.on('tool(demo)', function(obj) { 
		var pop = obj.data; 
		if (obj.event === 'detail') {
		parent.layer.open({
			title: '详细信息',
			type: 1,
			area: ['45%','60%'],
			content: '<div id="pop" >'+
						'<div class="layui-row layui-col-space20 popContent">'+
							'<div class="layui-col-md5">'+
								'<img id="popImg" src="'+pop.photo+'"'+
									'style="width: 70%;height: 70%;margin-left: 12px;border-radius: 10px;">'+
							'</div>'+
							'<div class="layui-col-md7">'+

								'<span class=" block margin-bottom-10" style="font-weight: bold;font-size: 16px;">状态：'+pop.state+'</span> '+
								'<span class=" block margin-bottom-10" >宠物编号：'+pop.adoptPetCode+'</span> '+
								'<span   class=" block margin-bottom-10">宠物昵称：'+pop.nickname+'</span> '+ 
								'<span   class=" block margin-bottom-10" >年龄：'+pop.age+'岁</span> '+
								'<span  class=" block margin-bottom-10">体重：'+pop.weight+'kg</span>'+
								'<span  class=" block margin-bottom-10">种类：'+pop.species+'</span> '+
								'<span  class=" block margin-bottom-10">颜色：'+pop.color+'</span> '+
								'<span  class=" block margin-bottom-10">是否绝育：'+pop.sterilization+'</span> '+
								'<span  class=" block margin-bottom-10">是否免疫：'+pop.immunity+'</span> '+
							'</div>'+
						'</div>'+ 
					'</div>', 
			})
		}else if (obj.event === 'edit') {
			parent.layer.open({
				type : 1,
				title : "修改宠物信息",
				area : [ '50%','90%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物照片</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="file"'
                            + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
                             +'id="xFile"'
                            + 'style="position:absolute;clip:rect(0 0 0 0);"'
                            + 'onchange="uploadPhoto()">'
						+'<label class="upload-button"'
                            + 'for="xFile">'
                         +'<img id="photo" src="'+pop.photo+'" style="width:25%;height:25%;border-radius: 10px;" alt="">'
                     + '</label> '
						 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">宠物编号</label>' 
						+ '<div class="layui-input-block">' 
						+ '<input type="text" name="adoptPetCode" id="adoptPetCode" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' 
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
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="sterilization" id="sterilization" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">是否免疫</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="immunity" id="immunity" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					layero.find("#adoptPetCode").val(pop.adoptPetCode);
					layero.find("#nickname").val(pop.nickname);
					layero.find("#age").val(pop.age);
					layero.find("#weight").val(pop.weight);
					layero.find("#species").val(pop.species);
					layero.find("#color").val(pop.color);
					layero.find("#sterilization").val(pop.sterilization);
					layero.find("#immunity").val(pop.immunity);  
					 
				},
				yes : function(index, layero) {
					console.log(layero.find("#photo"));
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
							sterilization : layero.find("#sterilization").val(),
							immunity : layero.find("#immunity").val(),
							photo : layero.find("#photo")[0].currentSrc,
							state : '待领养'
						},
						success : function(msg) {
							parent.layer.closeAll();
						},
						error : function(msg) {
							parent.layer.closeAll();
						}
					})
				},
				cancel : function(index, layero) {
					layer.close(index);
				},
				end : function() {
					table.reload('petTable', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllPet',
						},
						url : '/PetHospital/servlet/AdoptPetServlet',
						method : 'post'
					});
				}
			}); 
		} else if (obj.event === 'delete') {
			parent.layer.confirm('确定要删除吗？', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/AdoptPetServlet",
					type : "POST",
					data : {
						type : 'deletePet',
						code : pop.adoptPetCode,
						state : '待领养'
					},
					success : function(msg) {
						if (msg == 'true') {
							// 删除这一行
							// 关闭弹框
							parent.layer.close(index);
							parent.layer.msg("删除成功", {
								icon : 6
							});
							refreashTable();
						} else {
							parent.layer.msg("删除失败", {
								icon : 5
							});
						}
					}
				});
				return false;
			});
		}
	})
		$("#addAdoptPet").on( 'click',
			function() {
			parent.layer.open({
				type : 1,
				title : "新增待领养宠物",
				area : [ '50%','90%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">宠物照片</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="file"'
			            + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
			             +'id="xFile"'
			            + 'style="position:absolute;clip:rect(0 0 0 0);"'
			            + 'onchange="uploadPhoto()">'
					+'<label class="upload-button"'
			            + 'for="xFile">'
			         +'<img id="photo" src="assets/images/moren.jpg" style="width:25%;height:25%;border-radius: 10px;" alt="">'
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
					+'<input type="radio" name="immunity" value="是" title="是">'
					+'<input type="radio" name="immunity" value="否" title="否" checked> '
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">是否免疫</label>' 
					+'<div class="layui-input-block">'
					+'<input type="radio" name="sterilization" value="是" title="是">'
					+'<input type="radio" name="sterilization" value="否" title="否" checked>'
					+ '</div>' + '</div>' 
					+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					parent.layui.form.render();
				},
				yes : function(index, layero) {
					parent.layui.form.render();
					$.ajax({
						url : '/PetHospital/servlet/AdoptPetServlet',
						type : 'POST',
						data : {
							type : 'addAdoptPet',
							nickname : layero.find("#nickname").val(),
							age : layero.find("#age").val(),
							weight : layero.find("#weight").val(),
							species : layero.find("#species").val(),
							color : layero.find("#color").val(),
							sterilization : parent.$('input[name="sterilization"]:checked').val(),
							immunity : parent.$('input[name="immunity"]:checked').val(),
							gender : parent.$('input[name="gender"]:checked').val(),
							photo : parent.imgSrc
						},
						success : function(msg) {
							parent.layer.closeAll();
						},
						error : function(msg) {
							parent.layer.closeAll();
						}
					})
				},
				cancel : function(index, layero) {
					layer.close(index);
				},
				end : function() {
					table.reload('petTable', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllPet',
						},
						url : '/PetHospital/servlet/AdoptPetServlet',
						method : 'post'
					});
				}
			}); 

			});
	function refreashTable() {
		table.reload('petTable', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllPet',
				state : '待领养'
			},
			url : '/PetHospital/servlet/AdoptPetServlet',
			method : 'post'
		});
	}
	
	var addCon = '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">宠物照片</label>' 
		+ '<div class="layui-input-block">'
		+ '<input type="file"'
            + 'accept="image/png, image/jpeg, image/gif, image/jpg"'
             +'id="xFile"'
            + 'style="position:absolute;clip:rect(0 0 0 0);"'
            + 'onchange="uploadPhoto()">'
		+'<label class="upload-button"'
            + 'for="xFile">'
         +'<img id="photo" src="assets/images/moren.jpg" style="width:25%;height:25%;border-radius: 10px;" alt="">'
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
		+'<input type="radio" name="gender" value="雄" title="雄">'
		+'<input type="radio" name="gender" value="雌" title="雌" checked>'
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
		+'<input type="radio" name="immunity" value="是" title="是">'
		+'<input type="radio" name="immunity" value="否" title="否" checked> '
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">是否免疫</label>' 
		+'<div class="layui-input-block">'
		+'<input type="radio" name="sterilization" value="是" title="是">'
		+'<input type="radio" name="sterilization" value="否" title="否" checked>'
		+ '</div>' + '</div>' 
		+ '</form>';
})
