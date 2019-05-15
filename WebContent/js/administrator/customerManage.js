layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	getCurUser();
//	$.ajax({
//		type : "POST",
//		async : false,
//		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
//		url : "/PetHospital/servlet/CustomerServlet",
//		dataType : 'json',
//		data : {
//			'type' : 'queryAllCustomer', 
//		},
//		success : function(data) {
//			datas = eval(data);
//			table.render();
//		},
//		error : function(error) {
//			alert("cannot find!");
//		}
//	});

	// 展示已知数据
	var tableIns = table.render({
		elem : '#customerTable',
		id : 'customerTable',
		url : '/PetHospital/servlet/CustomerServlet',
		where : {
			type : 'queryAllCustomer'
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'customerCode',
			title : '编号', 
			sort : true
		}, {
			field : 'userName',
			title : '客户姓名', 
		}, {
			field : 'gender',
			title : '性别', 
		}, {
			field : 'phone',
			title : '联系方式', 
		}, {
			field : 'address',
			title : '家庭住址', 
		}, {
			field : 'operate',
			title : '操作', 
			align : 'center',
			toolbar : '#customerTool'
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

	var active = {
		reload : function() {
			var selContent = $('#selContent').val();// 获取输入框的值
			var selItem = $("#select").val();
			// 执行重载
			table.reload('customerTable', {
				page : {
					curr : 1 
				},
				where : {
					type : 'selectCustomer', 
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/CustomerServlet',// 后台做模糊搜索接口路径
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
		parent.layer.open({
			title: '详细信息',
			type: 1,
			area: ['45%','50%'],
			content: '<div id="pop" >'+
						'<div class="layui-row layui-col-space20 popContent">'+
							'<div class="layui-col-md5">'+
								'<img id="popImg" src="'+pop.photo+'"'+
									'style="width: 70%;height: 70%;margin-left: 12px;border-radius: 10px;">'+
							'</div>'+
							'<div class="layui-col-md7">'+
								'<span id="customerCode" class=" block margin-bottom-10" >编号：'+pop.customerCode+'</span> '+
								'<span id="userName" class=" block margin-bottom-10" >姓名：'+pop.userName+'</span> '+
								'<span id="gender" class=" block margin-bottom-10" >性别：'+pop.gender+'</span> '+
								'<span id="phone" class=" block margin-bottom-10">电话：'+pop.phone+'</span>'+
								'<span id="address" class=" block margin-bottom-10">住址：'+pop.address+'</span> '+
							'</div>'+
						'</div>'+ 
					'</div>', 
		})
	})

})
