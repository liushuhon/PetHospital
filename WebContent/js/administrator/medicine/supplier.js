layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;

	// 展示已知数据
	var tableIns = table.render({
		elem : '#suppTable',
		id : 'supplier',
		url : '/PetHospital/servlet/medicine/SupplierServlet',
		where : {
			type : 'queryAllSupplier'
		},
		request : {
			pageName : 'curr',
			limitName : 'nums'
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
			field : 'supplier',
			title : '生产商',
		},  {
			align : 'center',
			field : 'tel',
			title : '联系电话',
		},{
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#suppTool'
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
			parent.layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/medicine/SupplierServlet",
					type : "POST",
					data : {
						type : 'deleteSupplier',
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
				title : "修改生产厂家信息",
				area : [ '420px', '320px' ],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' + '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">编号</label>' + '<div class="layui-input-block">' + '<input type="text" name="cateTypeId" id="manuId" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' + '</div>' + '</div>' + '<div class="layui-form-item">'
						+ '<label class="layui-form-label">供应商</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="supplier" id="supplier" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入供应商名字" class="layui-input">'
					 
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">联系电话</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="tel" id="tel" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
					 
						+ '</div>' + '</div>' 
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					layero.find("#supplier").val(data.supplier);
					layero.find("#manuId").val(data.id);
					layero.find("#tel").val(data.tel);
				},
				yes : function(index, layero) {
					let id = layero.find("#manuId").val();
					let supplier = layero.find("#supplier").val();
					let tel =  layero.find("#tel").val();
					$.ajax({
						url : '/PetHospital/servlet/medicine/SupplierServlet',
						type : 'POST',
						data : {
							type : 'updateSupplier',
							id : id,
							supplier : supplier,
							tel : tel
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
					refreashTable();
				}
			}); 
		}
	});
	function refreashTable() {
		table.reload('supplier', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllSupplier',
			},
			url : '/PetHospital/servlet/medicine/SupplierServlet',
			method : 'post'
		});
	}
	 
	$("#addSupp").on( 'click',
			function() {
				parent.layer.open({
					type : 1,
					title : "新增供应商",
					area : [ '420px', '280px' ],
					content : '<div class="layui-form-item" style="margin-top: 40px">'
							+ '<label class="layui-form-label">供应商</label>' + '<div class="layui-input-block">'
							+ '<input type="text" style="width:80%" name="supplier" id="supplier" required lay-verify="required" autocomplete="off" placeholder="请输入供应商" class="layui-input">'
							+ '</div></div>'
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">联系电话</label>' + '<div class="layui-input-block">'
							+ '<input type="text" style="width:80%" name="tel" id="tel" required lay-verify="required" autocomplete="off" placeholder="请输入联系电话" class="layui-input">'
							+ '</div></div>',

					btn : [ '确定', '取消' ],
					yes : function(index, layero) {
						$.ajax({
							url : '/PetHospital/servlet/medicine/SupplierServlet',
							type : 'POST',
							data : {
								type : 'addSupplier',
								supplier : layero.find('#supplier').val(),
								tel : layero.find('#tel').val()
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
						refreashTable(); 
					}
				});

			});

	var active = {
		reload : function() {
			var selContent = $('#selContent').val();// 获取输入框的值
			var selItem = $("#select").val();
			// 执行重载
			table.reload('supplier', {
				page : {
					curr : 1
				},
				where : {
					type : 'selectSupplier',
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/medicine/SupplierServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

})
