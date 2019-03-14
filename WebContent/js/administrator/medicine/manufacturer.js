layui.use([ 'element', 'table', 'form', 'jquery'], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery; 
 
	// 展示已知数据
	var tableIns = table.render({
		elem : '#categaryTable',
		id : 'categary',
		url : '/PetHospital/servlet/medicine/CategaryServlet',
		where: {type: 'queryAllCategary'},
		request: {
		    pageName: 'curr' //页码的参数名称，默认：page
		    ,limitName: 'nums' //每页数据量的参数名，默认：limit
		  },
		  method: 'post',
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
		if (obj.event === 'detail') {
			layer.msg('ID：' + data.id + ' 的查看操作');
		} else if (obj.event === 'delete') {
			layer.confirm('真的删除行么', function(index) {
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
							layer.close(index);
							layer.msg("删除成功", {
								icon : 6
							});
							refreashTable(); 
						} else {
							layer.msg("删除失败", {
								icon : 5
							});
						}
					}
				});
				return false;
			});
		} else if (obj.event === 'edit') {
			layer.open({
				type : 1,
				title : "修改药品类别信息",
				area : [ '420px', '280px' ],
				content : $("#popUpdateTest"),
				success : function(layero, index) {
					$("#category").val(data.categary);
					$("#categaryId").val(data.id);
				}

			});
			// 动态向表传递赋值可以参看文章进行修改界面的更新前数据的显示，当然也是异步请求的要数据的修改数据的获取
			setFormValue(obj, data);
		}
	});
	function refreashTable(){
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
	function setFormValue(obj, data) {
		form.on('submit(confirmUpdate)', function(message) {
			let id = message.field.cateTypeId;
			let categary = message.field.category;
			$.ajax({
				url : '/PetHospital/servlet/medicine/CategaryServlet',
				type : 'POST',
				data : {
					type : 'updateCategary',
					id : id,
					categary : categary
				},
				success : function(msg) {  
					if (msg == 'true') {
						layer.msg("修改成功", {
							icon : 6
						});
						setTimeout(function() {
							obj.update({
								id : id,
								categary : categary, 
							}); 
							layer.closeAll(); 
						}, 2000); 
					} else {
						layer.msg("修改失败", {
							icon : 5
						});
					}
				}
			})
		})
	} 
	$("#addCategary").on('click', function() {
		parent.addPopShow();
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
