layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;

	// 展示已知数据
	var tableIns = table.render({
		elem : '#categaryTable',
		id : 'categary',
		url : '/PetHospital/servlet/medicine/CategaryServlet',
		where : {
			type : 'queryAllCategary'
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
			field : 'id',
			title : '编号',
			sort : true
		}, {
			align : 'center',
			field : 'categary',
			title : '药品类别',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#categaryTool'
		} ] ],

		skin : 'line',
		even : true,
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
			parent.layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/medicine/CategaryServlet",
					type : "POST",
					data : {
						type : 'deleteCategary',
						id : data.id,
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
				title : "修改药品类别信息",
				area : [ '420px', '280px' ],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' + '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">类别编号</label>' + '<div class="layui-input-block">' + '<input type="text" name="cateTypeId" id="categaryId" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' + '</div>' + '</div>' + '<div class="layui-form-item">'
						+ '<label class="layui-form-label">药品类别</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="category" id="categary" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入药品类别" class="layui-input">'
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					layero.find("#categary").val(data.categary);
					layero.find("#categaryId").val(data.id);
				},
				yes : function(index, layero) {
					let id = layero.find("#categaryId").val();
					let categary = layero.find("#categary").val();
					$.ajax({
						url : '/PetHospital/servlet/medicine/CategaryServlet',
						type : 'POST',
						data : {
							type : 'updateCategary',
							id : id,
							categary : categary
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
					table.reload('categary', {
						page : {
							curr : 1
						},
						where : {
							type : 'queryAllCategary',
						},
						url : '/PetHospital/servlet/medicine/CategaryServlet',
						method : 'post'
					});
				}
			}); 
		}
	});
	function refreashTable() {
		table.reload('categary', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllCategary',
			},
			url : '/PetHospital/servlet/medicine/CategaryServlet',
			method : 'post'
		});
	}
	 
	$("#addCategary").on( 'click',
			function() {
				parent.layer.open({
					type : 1,
					title : "新增药品类别信息",
					area : [ '420px', '200px' ],
					content : '<div class="layui-form-item" style="margin-top: 40px">' 
							+ '<label class="layui-form-label">药品类别</label>' + '<div class="layui-input-block">'
							+ '<input type="text" style="width:80%" name="categary2" id="categary2" required lay-verify="required" autocomplete="off" placeholder="请输入药品类别" class="layui-input">'
							+ '</div></div>',

					btn : [ '确定', '取消' ],
					yes : function(index, layero) {
						$.ajax({
							url : '/PetHospital/servlet/medicine/CategaryServlet',
							type : 'POST',
							data : {
								type : 'addCategary',
								categary : layero.find('#categary2').val()
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
						table.reload('categary', {
							page : {
								curr : 1
							},
							where : {
								type : 'queryAllCategary',
							},
							url : '/PetHospital/servlet/medicine/CategaryServlet',
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
			table.reload('categary', {
				page : {
					curr : 1
				},
				where : {
					type : 'selectCategary',
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/medicine/CategaryServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

})
