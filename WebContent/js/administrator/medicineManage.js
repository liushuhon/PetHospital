layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery; 
	var cateOption = [];
	var manuOption = [];
	var suppOption = [];
	var speciOption = [];
	
//	var getCateOption = function(){
//		
//	};
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
		parent.layui.form.render(); 
		var data = obj.data;  
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
				area : [ '600px'],
				content : editCon,
				btn : [ '确定', '取消' ],
				success : function(layero, index) { 
					parent.layui.form.render(); 
					layero.find("#medicineCode").val(data.medicineCode);  
					layero.find("#medicineName").val(data.medicineName);
					layero.find("#price").val(data.price);
					layero.find("#costPrice").val(data.costPrice);
					addOption('categary','edit',data);
					addOption('specifications','edit',data);
					addOption('manufacturer','edit',data);
					addOption('supplier','edit',data);
					parent.layui.form.render(); 
				},
				yes : function(index, layero) {  
					let medicineCode = layero.find("#medicineCode").val();
					let price =  layero.find("#price").val();
					let costPrice = layero.find("#costPrice").val();
					let medicineName =  layero.find("#medicineName").val();
					let categary = parent.document.getElementById('cateSelect').value;
					let specifications = parent.document.getElementById('speciSelect').value;
					let manufacturer = parent.document.getElementById('manuSelect').value;
					let supplier = parent.document.getElementById('suppSelect').value;
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

	$("#addMedicine").on( 'click',
			function() {
				parent.layer.open({
					type : 1,
					title : "新增药品",
					area : [ '600px', '540px' ],
					content :addCon,

					btn : [ '确定', '取消' ],
					success : function(layero, index) { 
						parent.layui.form.render(); 
						addOption('categary','add');
						addOption('specifications','add');
						addOption('manufacturer','add');
						addOption('supplier','add');
						parent.layui.form.render(); 
					},
					yes : function(index, layero) {
						$.ajax({
							url : '/PetHospital/servlet/MedicineServlet',
							type : 'POST',
							data : {
								type : 'addMedicine', 
								price : layero.find("#price").val(),
								costPrice:layero.find("#costPrice").val(),
								medicineName: layero.find("#medicineName").val(),
								categary : parent.document.getElementById('cateSelect').value,
								specifications : parent.document.getElementById('speciSelect').value,
								manufacturer : parent.document.getElementById('manuSelect').value,
								supplier : parent.document.getElementById('suppSelect').value,
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
	 
	(function(){
		$.ajax({
			url : '/PetHospital/servlet/medicine/CategaryServlet',
						type : 'POST',
						data : {
							type : 'getAllCategory'
						},
						success : function(msg) { 
							cateOption=eval(msg); 
						},
						errors : function(msg) {
							layer.msg('失败');
						}
		});
		$.ajax({
			url : '/PetHospital/servlet/medicine/ManuServlet',
						type : 'POST',
						data : {
							type : 'getAllManu'
						},
						success : function(msg) { 
							manuOption=eval(msg);
						},
						errors : function(msg) {
							layer.msg('失败');
						}
		});
		$.ajax({
			url : '/PetHospital/servlet/medicine/SupplierServlet',
						type : 'POST',
						data : {
							type : 'getAllSupp'
						},
						success : function(msg) { 
							suppOption=eval(msg);
						},
						errors : function(msg) {
							layer.msg('失败');
						}
		});
		$.ajax({
			url : '/PetHospital/servlet/medicine/SpecificationServlet',
						type : 'POST',
						data : {
							type : 'getAllSpeci'
						},
						success : function(msg) { 
							speciOption=eval(msg);
						},
						errors : function(msg) {
							layer.msg('失败');
						}
		});
	})();
	var editCon =  '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
		+ '<div class="layui-form-item" style="margin-top: 40px">'
		+ '<label class="layui-form-label">药品编号</label>' + '<div class="layui-input-block">' + '<input type="text" name="medicineCode" id="medicineCode" required'
		+ 'lay-verify="required" autocomplete="off" readonly class="layui-input" style="width:80%">' + '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">药品名</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="medicineName" id="medicineName" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">进价</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="costPrice" id="costPrice" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">售价</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="price" id="price" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input">'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">药品类别</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
	    + '<select id="cateSelect" lay-filter="cateSelect" lay-verify="required"  >'
        + '<option value="">请选择药品类别</option>'
        + '</select>'
		+ '</div>' + '</div>'  
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">药品规格</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
		+ '<select id="speciSelect" lay-filter="speciSelect" lay-verify="required"  >'
	    + '<option value="">请选择药品规格</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">生产商</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
		+ '<select id="manuSelect" lay-filter="manuSelect" lay-verify="required"  >'
	    + '<option value="">请选择生产商</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">供应商</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
		+ '<select id="suppSelect" lay-filter="suppSelect" lay-verify="required"  >'
	    + '<option value="">请选择供应商</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
 
		+ '</form>';
	var addCon = '<form class="layui-form layui-from-pane" action="" style="margin-top: 20px">' 
		+ '<div class="layui-form-item"  style="margin-top: 40px">'
		+ '<label class="layui-form-label">药品名</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="medicineName" id="medicineName" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入药品名"  class="layui-input">'
		+ '</div>' + '</div>'
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">进价/元</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="costPrice" id="costPrice" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入进价/元"  class="layui-input">'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">售价/元</label>' + '<div class="layui-input-block">'
		+ '<input type="text" name="price" id="price" required style="width:80%" lay-verify="required" autocomplete="off" placeholder="请输入售价/元"  class="layui-input">'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">药品类别</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
	    + '<select id="cateSelect" lay-filter="cateSelect" lay-verify="required"  >'
        + '<option value="">请选择药品类别</option>'
        + '</select>'
		+ '</div>' + '</div>'  
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">药品规格</label>' 
		+ '<div class="layui-input-block" style="width:35%">'
		+ '<select id="speciSelect" lay-filter="speciSelect" lay-verify="required">'
	    + '<option value="">请选择药品规格</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">生产商</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
		+ '<select id="manuSelect" lay-filter="manuSelect" lay-verify="required"  >'
	    + '<option value="">请选择生产商</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
		+ '<div class="layui-form-item">'
		+ '<label class="layui-form-label">供应商</label>' 
		+ '<div class="layui-input-block" style="width:35%" >'
		+ '<select id="suppSelect" lay-filter="suppSelect" lay-verify="required"  >'
	    + '<option value="">请选择供应商</option>'
	    + '</select>'
		+ '</div>' + '</div>' 
		+ '<form>';
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
	/**
	 * 增加option
	 * @param type
	 * @param data
	 * @param _this
	 */
	function addOption(type,handleType,data) {
		if (type === 'categary') {
			cateOption.map(function(obj) {
				var selectEle = parent.document.getElementById('cateSelect');  
				var optionObj = parent.document.createElement("option");  
				optionObj.value = obj.categary;  
				optionObj.innerHTML = obj.categary;   
				if(handleType==='edit' && obj.categary===data.category){
					optionObj.selected = "selected";
				}
				selectEle.appendChild(optionObj);    
			});
		} else if (type === 'supplier') {
			suppOption.map(function(obj) {
				var selectEle = parent.document.getElementById('suppSelect');  
				var optionObj = parent.document.createElement("option");  
				optionObj.value = obj.supplier;  
				optionObj.innerHTML = obj.supplier;   
				if(handleType==='edit' && obj.supplier===data.supplier){
					optionObj.selected = "selected";
				}
				selectEle.appendChild(optionObj);    
			});
		} else if (type === 'manufacturer') {
			manuOption.map(function(obj) {
				var selectEle = parent.document.getElementById('manuSelect');  
				var optionObj = parent.document.createElement("option");  
				optionObj.value = obj.manufacture;  
				optionObj.innerHTML = obj.manufacture;   
				if(handleType==='edit' && obj.manufacture===data.manufacturer){
					optionObj.selected = "selected";
				}
				selectEle.appendChild(optionObj);    
			});
		} else if (type === 'specifications') {
			speciOption.map(function(obj) {
				var selectEle = parent.document.getElementById('speciSelect');  
				var optionObj = parent.document.createElement("option");  
				optionObj.value = obj.specification;  
				optionObj.innerHTML = obj.specification;   
				if(handleType==='edit' && obj.specification===data.specifications){
					optionObj.selected = "selected";
				}
				selectEle.appendChild(optionObj);    
			});
		}
		
	} 
})
