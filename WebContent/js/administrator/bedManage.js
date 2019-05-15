layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;

	// 展示已知数据
	var tableIns = table.render({
		elem : '#bedTable',
		id : 'bed',
		url : '/PetHospital/servlet/BedServlet',
		where : {
			type : 'queryAllBed'
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
			align : 'center',
			field : 'bedCode',
			title : '编号',
			sort : true
		}, {
			align : 'center',
			field : 'state',
			title : '状态',
		}, {
			align : 'center',
			field : 'petId',
			title : '宠物id',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#bedTool'
		} ] ],

		skin : 'line',
		page : true,
		limits : [ 5, 7, 10 ],
		limit : 5,
		response : {
			statusName : 'code',
			statusCode : 0,
			msgName : 'msg',
			countName : 'count',
			dataName : 'data'
		}
	});

	table.on('tool(table)', function(obj) {
		var data = obj.data;
		if (obj.event === 'delete') {
			parent.layer.confirm('真的删除改床位么', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/BedServlet",
					type : "POST",
					data : {
						type : 'deleteBed',
						bedCode : data.bedCode,
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
		} else if (obj.event === 'edit') {
			parent.layer.open({
				type : 1,
				title : "修改床位信息",
				area : [ '450px', '300px' ],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' + '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">床位编号</label>' + '<div class="layui-input-block">' + '<input type="text" name="bedCode" id="bedCode" required ' 
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' + '</div>' + '</div>' + '<div class="layui-form-item">'
						+ '<label class="layui-form-label">宠物id</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="petId" id="petId" required style="width:80%" lay-verify="required" autocomplete="off" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">状态</label>' + '<div class="layui-input-block"  style="width:30%" >'
						+ '<select id="state" lay-filter="state" lay-verify="required">'
					    + '<option value="空闲">空闲</option>'
					    + '<option value="满">满</option>'
					    + '</select>'
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					parent.layui.form.render();
					layero.find("#bedCode").val(data.bedCode);
					layero.find("#petId").val(data.petId);
					if (data.state === '空闲') {
						parent.$("option[value='空闲']").attr("selected", "selected");
					} else if (data.state === '满') {
						parent.$("option[value='满']").attr("selected", "selected");
					}
					parent.layui.form.render(); 
				},
				yes : function(index, layero) {
					let bedCode = layero.find("#bedCode").val();
					let petId = layero.find("#petId").val();
					let state = parent.document.getElementById('state').value
					$.ajax({
						url : '/PetHospital/servlet/BedServlet',
						type : 'POST',
						data : {
							type : 'updateBed',
							bedCode : bedCode,
							petId : petId,
							state : state
						},
						success : function(msg) {
							parent.layer.closeAll();
						}
					})
				},
				cancel : function(index, layero) {
					layer.close(index);
				},
				end : function() {
					table.reload('bed', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllBed',
						},
						url : '/PetHospital/servlet/BedServlet',
						method : 'post'
					});
				}
			}); 
		}
	});
	function refreashTable() {
		table.reload('bed', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllBed',
			},
			url : '/PetHospital/servlet/BedServlet',
			method : 'post'
		});
	}
	 
	$("#addBed").on( 'click',
			function() {
		parent.layui.form.render();
				parent.layer.open({
					type : 1,
					title : "新增床位信息",
					area : [ '420px', '250px' ],
					content :'<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">'  
								+'<div class="layui-form-item" style="margin-top: 40px">' 
								+ '<label class="layui-form-label">床位状态</label>' + '<div class="layui-input-block" style="width:30%">'
								+ '<select id="state" lay-filter="state" lay-verify="required">'
							    + '<option value="空闲">空闲</option>'
							    + '<option value="满">满</option>'
							    + '</select>'
							    + '</div></div></from>',

					btn : [ '确定', '取消' ],
					success : function(layero, index) {
						parent.layui.form.render();
					},
					yes : function(index, layero) {
						let state = parent.document.getElementById('state').value
						$.ajax({
							url : '/PetHospital/servlet/BedServlet',
							type : 'POST',
							data : {
								type : 'addBed',
								state : state
							},
							success : function(msg) {
								parent.layer.closeAll();
							},
							error : function(mag) {
							}
						})
					},
					cancel : function(index, layero) {
						layer.close(index);
					},
					end : function() {
						table.reload('bed', {
							page : {
								curr : 1
							},
							where : {
								type : 'queryAllBed',
							},
							url : '/PetHospital/servlet/BedServlet',
							method : 'post'
						});
					}
				});

			});

	var active = {
		reload : function() {
			var selContent = $('#selContent').val();// 获取输入框的值
			var selItem = $("#select").val();
			// 执行重载
			table.reload('bed', {
				page : {
					curr : 1
				},
				where : {
					type : 'selectBed',
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/BedServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

})
