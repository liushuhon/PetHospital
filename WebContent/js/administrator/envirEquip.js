layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	// 展示已知数据
	table.render({
		elem : '#faciTable',
		id : 'faciTable',
		url : '/PetHospital/servlet/FacilityServlet',
		where : {
			type : 'queryAllFacility',
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'faciCode',
			title : '编号',
			sort : true
		}, {
			field : 'faciName',
			title : '名称',
		}, {
			field : 'origin',
			title : '来源',
		}, {
			field : 'state',
			title : '状态',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			width : 200,
			toolbar : '#faciTool'
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
			table.reload('faciTable', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectFaci', 
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/FacilityServlet',// 后台做模糊搜索接口路径
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
								'<span class=" block margin-bottom-10" >编号：'+pop.faciCode+'</span> '+
								'<span class=" block margin-bottom-10">名称：'+pop.faciName+'</span> '+ 
								'<span class=" block margin-bottom-10" >来源：'+pop.origin+'</span> '+
								'<span class=" block margin-bottom-10" >描述：'+pop.faciDescribe+'</span> '+
							'</div>'+
						'</div>'+ 
					'</div>', 
			})
		}else if (obj.event === 'edit') {
			parent.layer.open({
				type : 1,
				title : "修改设施信息",
				area : [ '50%','90%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">设施照片</label>' 
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
						+ '<label class="layui-form-label">编号</label>' 
						+ '<div class="layui-input-block">' 
						+ '<input type="text" name="faciCode" id="faciCode" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">名称</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="faciName" id="faciName" required style="width:80%" lay-verify="required" autocomplete="off" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">来源</label>' 
						+ '<div class="layui-input-block">'
						+ '<input type="text" name="origin" id="origin" required style="width:80%" lay-verify="required" autocomplete="off" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">描述</label>' 
						+ '<div class="layui-input-block">'
						+ '<textarea name="faciDescribe" id="faciDescribe" placeholder="请输入内容" class="layui-textarea"></textarea>'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">状态</label>' 
						+ '<div class="layui-input-block" style="width:35%" >'
						+ '<select id="stateSelect" lay-filter="stateSelect" lay-verify="required"  >'
						+ '<option value="待使用">待使用</option>'
						+ '<option value="正在使用">正在使用</option>'
						+ '<option value="已报废">已报废</option>'
					    + '</select>'
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					parent.layui.form.render(); 
					layero.find("#faciCode").val(pop.faciCode);
					layero.find("#faciName").val(pop.faciName);
					layero.find("#origin").val(pop.origin);
					layero.find("#faciDescribe").val(pop.faciDescribe);
					if (pop.state === '待使用') {
						parent.$("option[value='待使用']").attr("selected", "selected");
					} else if (pop.state === '正在使用') {
						parent.$("option[value='正在使用']").attr("selected", "selected");
					} else if (pop.state === '已报废') {
						parent.$("option[value='已报废']").attr("selected", "selected");
					}
					parent.layui.form.render(); 
				},
				yes : function(index, layero) {
					console.log(layero.find("#photo"));
					$.ajax({
						url : '/PetHospital/servlet/FacilityServlet',
						type : 'POST',
						data : {
							type : 'updateFaciByCode',
							faciCode : layero.find("#faciCode").val(),
							origin : layero.find("#origin").val(),
							faciDescribe : layero.find("#faciDescribe").val(),
							faciName : layero.find("#faciName").val(),
							photo : layero.find("#photo")[0].currentSrc,
							state : parent.document.getElementById('stateSelect').value
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
					table.reload('faciTable', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllFacility',
						},
						url : '/PetHospital/servlet/FacilityServlet',
						method : 'post'
					});
				}
			}); 
		} else if (obj.event === 'delete') {
			parent.layer.confirm('确定要删除吗？', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/FacilityServlet",
					type : "POST",
					data : {
						type : 'deleteFaci',
						code : pop.faciCode
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
		$("#addFaci").on( 'click',
			function() {
			parent.layer.open({
				type : 1,
				title : "新增设施",
				area : [ '50%','80%'],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">设施照片</label>' 
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
					+ '<label class="layui-form-label">名称	</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="faciName" id="faciName" required style="width:80%" lay-verify="required" autocomplete="off" class="layui-input">'
					+ '</div>' + '</div>'
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">来源</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="origin" id="origin" required style="width:80%" lay-verify="required" autocomplete="off" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">描述</label>' 
					+ '<div class="layui-input-block">'
					+ '<input type="text" name="faciDescribe" id="faciDescribe" required style="width:80%" lay-verify="required" class="layui-input">'
					+ '</div>' + '</div>' 
					+ '<div class="layui-form-item">'
					+ '<label class="layui-form-label">状态</label>' 
					+ '<div class="layui-input-block" style="width:35%" >'
					+ '<select id="stateSelect" lay-filter="stateSelect" lay-verify="required"  >'
					+ '<option value="待使用">待使用</option>'
					+ '<option value="正在使用">正在使用</option>'
					+ '<option value="已报废">已报废</option>'
				    + '</select>'
					+ '</div>' + '</div>' 
					+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					parent.layui.form.render();
				},
				yes : function(index, layero) {
					parent.layui.form.render();
					$.ajax({
						url : '/PetHospital/servlet/FacilityServlet',
						type : 'POST',
						data : {
							type : 'addFacility',
							faciName : layero.find("#faciName").val(),
							origin : layero.find("#origin").val(),
							faciDescribe : layero.find("#faciDescribe").val(),
							state : parent.document.getElementById('stateSelect').value,
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
					table.reload('faciTable', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllFacility',
						},
						url : '/PetHospital/servlet/FacilityServlet',
						method : 'post'
					});
				}
			}); 

			});
	
	function refreashTable() {
		table.reload('faciTable', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllFacility'
			},
			url : '/PetHospital/servlet/FacilityServlet',
			method : 'post'
		});
	}
})
