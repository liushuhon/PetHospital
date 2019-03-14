layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	getCurUser();
	$.ajax({
		type : "POST",
		async : false,
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		url : "/PetHospital/servlet/PetServlet",
		dataType : 'json',
		data : {
			'type' : 'queryAllPets', 
		},
		success : function(data) {
			datas = eval(data);
			table.render();
		},
		error : function(error) {
			alert("cannot find!");
		}
	});

	// 展示已知数据
	table.render({
		elem : '#customerTable',
		id : 'customerTable',
		cols : [ [ // 标题栏
		{
			field : 'petCode',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物昵称',
		}, {
			field : 'age',
			title : '年龄',
		}, {
			field : 'gender',
			title : '雌雄',
		}, {
			field : 'userName',
			title : '主人姓名',
		}, {
			field : 'species',
			title : '宠物类别',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#customerTool'
		} ] ],
		data : datas,
		skin : 'line' // 表格风格
		,
		even : true,
		page : true // 是否显示分页
		,
		limits : [ 5, 7, 10 ],
		limit : 5 // 每页默认显示的数量
		,
		response : {
			statusName : 'code' // 数据状态的字段名称，默认：code
			,
			statusCode : 0 // 成功的状态码，默认：0
			,
			msgName : 'msg' // 状态信息的字段名称，默认：msg
			,
			countName : 'count' // 数据总数的字段名称，默认：count
			,
			dataName : 'data' // 数据列表的字段名称，默认：data
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
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectRegistration',
					doctorId : curUserId,
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/RegistrationServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	table.on('tool(demo)', function(obj) {
		var data = obj.data;
		location.href = "prescribe.html?registrationCode="
				+ data.registrationCode;

	})

})
