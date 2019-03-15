layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	form.render();
	// 展示已知数据
	var tableIns = table.render({
		elem : '#medicineTable',
		id : 'medicine',
		url : '/PetHospital/servlet/MedicineServlet',
		where : {
			type : 'queryAllMedicine'
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
			field : 'medicineCode',
			title : '编号',
			sort : true
		}, {
			align : 'center',
			field : 'medicineName',
			title : '药品名',
		}, {
			align : 'center',
			field : 'category',
			title : '种类',
		}, {
			align : 'center',
			field : 'specifications',
			title : '药品规格',
		}, {
			align : 'center',
			field : 'manufacturer',
			title : '生产商',
		}, {
			align : 'center',
			field : 'supplier',
			title : '供应商',
		}, {
			align : 'center',
			field : 'price',
			title : '售价/元',
		}, {
			align : 'center',
			field : 'costPrice',
			title : '进价/元',
		}, {
			align : 'center',
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#medicineTool'
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
		console.log(obj);
		if (obj.event === 'delete') {
			parent.layer.confirm('真的删除行么', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/MedicineServlet",
					type : "POST",
					data : {
						type : 'deleteMedicine',
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
				title : "修改药品信息",
				area : [ '600px', ],
				content : '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
						+ '<div class="layui-form-item" style="margin-top: 40px">'
						+ '<label class="layui-form-label">药品编号</label>' + '<div class="layui-input-block">' + '<input type="text" name="medicineCode" id="medicineCode" required'
						+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' + '</div>' + '</div>' + '<div class="layui-form-item">'
						+ '<label class="layui-form-label">药品类别</label>' + '<div class="layui-input-block">'
					    + '<select name="city" lay-verify="required">'
				        + '<option value="dddddd">ddddd</option>'
				        + '<option value="0">北京</option>'
				        + '<option value="1">上海</option>'
				        + '<option value="2">广州</option>'
				        + '<option value="3">深圳</option>'
				        + '<option value="4">杭州</option>'
				        + '</select>'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">药品名</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="medicineName" id="medicineName" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">药品规格</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="specifications" id="specifications" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">生产商</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="manufacturer" id="manufacturer" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">供应商</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="supplier" id="supplier" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">进价</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="costPrice" id="costPrice" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						+ '<div class="layui-form-item">'
						+ '<label class="layui-form-label">售价</label>' + '<div class="layui-input-block">'
						+ '<input type="text" name="price" id="price" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
						+ '</div>' + '</div>' 
						
						+ '</form>',
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					 form.render();

					console.log(data.medicineCode)
					layero.find("#medicineCode").val(data.medicineCode);
					layero.find("#categary").val(data.category);
					layero.find("#medicineName").val(data.medicineName);
					layero.find("#specifications").val(data.specifications);
					layero.find("#manufacturer").val(data.manufacturer);
					layero.find("#price").val(data.price);
					layero.find("#costPrice").val(data.costPrice);
					layero.find("#supplier").val(data.supplier); 
				},
				yes : function(index, layero) {
					let medicineCode = layero.find("#medicineCode").val();
					let categary = layero.find("#categary").val();
					let medicineName =  layero.find("#medicineName").val();
					let specifications = layero.find("#specifications").val();
					let manufacturer = layero.find("#manufacturer").val();
					let price =  layero.find("#price").val();
					let costPrice = layero.find("#costPrice").val();
					let supplier = layero.find("#supplier").val(); 
					$.ajax({
						url : '/PetHospital/servlet/MedicineServlet',
						type : 'POST',
						data : {
							type : 'updateMedicine',
							medicineCode : medicineCode,
							categary : categary,
							medicineName : medicineName,
							specifications : specifications,
							manufacturer : manufacturer,
							price : price,
							costPrice : costPrice,
							supplier : supplier
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
		table.reload('medicine', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllMedicine',
			},
			url : '/PetHospital/servlet/MedicineServlet',
			method : 'post'
		});
	}
	 
	$("#addMedicine").on( 'click',
			function() {
				parent.layer.open({
					type : 1,
					title : "新增药品",
					area : [ '600px', '540px' ],
					content :'<div class="layui-form-item"  style="margin-top: 40px">'
							+ '<label class="layui-form-label">药品名</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="medicineName" id="medicineName" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入药品名"  class="layui-input">'
							+ '</div>' + '</div>'  
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">药品类别</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="categary" id="categary" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入生产厂家名字" class="layui-input">'
							+ '</div>' + '</div>' 
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">药品规格</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="specifications" id="specifications" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入药品规格"  class="layui-input">'
							+ '</div>' + '</div>' 
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">生产商</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="manufacturer" id="manufacturer" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入生产商"  class="layui-input">'
							+ '</div>' + '</div>' 
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">供应商</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="supplier" id="supplier" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入供应商"  class="layui-input">'
							+ '</div>' + '</div>' 
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">进价/元</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="costPrice" id="costPrice" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入进价/元"  class="layui-input">'
							+ '</div>' + '</div>' 
							+ '<div class="layui-form-item">'
							+ '<label class="layui-form-label">售价/元</label>' + '<div class="layui-input-block">'
							+ '<input type="text" name="price" id="price" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入售价/元"  class="layui-input">'
							+ '</div>' + '</div>' ,

					btn : [ '确定', '取消' ],
					yes : function(index, layero) {
						$.ajax({
							url : '/PetHospital/servlet/MedicineServlet',
							type : 'POST',
							data : {
								type : 'addMedicine', 
								categary:layero.find("#categary").val(),
							    medicineName:layero.find("#medicineName").val(),
								specifications:layero.find("#specifications").val(),
								manufacture:layero.find("#manufacture").val(),
								price : layero.find("#price").val(),
								costPrice:layero.find("#costPrice").val(),
								supplier: layero.find("#supplier").val(),
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
			table.reload('medicine', {
				page : {
					curr : 1
				},
				where : {
					type : 'selectMedicine',
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/MedicineServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});

})
