layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	getCurUser();

	// 展示已知数据
	table.render({
		elem : '#inHospitalTable',
		id : 'inHospitalTable',
		url : '/PetHospital/servlet/InHospitalServlet',
		where : {
			type : 'queryAllInHospital',
			doctorId : curUserId,
			mark : '住院'
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
			field : 'id',
			title : '编号',
			width : 80,
			sort : true
		}, {
			field : 'cusName',
			title : '主人姓名'
		}, {
			field : 'petName',
			title : '宠物昵称'
		}, {
			field : 'bedId',
			title : '床位编号'
		}, {
			field : 'stayDays',
			title : '住院时间'
		}, {
			field : 'mark',
			title : '状态'
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			toolbar : '#inHospitalTool'
		} ] ], 
		skin : 'line' // 表格风格
		,
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
			table.reload('inHospitalTable', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectInHospital',
					doctorId : curUserId,
					selContent : selContent,
					selItem : selItem,
					mark : '住院'
				},// 这里传参 向后台
				url : '/PetHospital/servlet/InHospitalServlet',// 后台做模糊搜索接口路径
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
		console.log(data);
		if (obj.event === 'outHospital') {
			// bed置为空闲 situationmark置为出院 inhospitalmark置为出院
			parent.layer.confirm('确认出院吗', function(index) {
				$.ajax({
					url : "/PetHospital/servlet/BedServlet",
					type : "POST",
					data : {
						type : 'updateBed',
						petId : 'null',
						bedCode : data.bedId,
						state : '空闲'
					},
					success : function(msg) {
						$.ajax({
							type : "POST",
							async : false,
							contentType : 'application/x-www-form-urlencoded; charset=utf-8',
							url : "/PetHospital/servlet/SituationServlet",
							dataType : 'json',
							data : {
								'type' : 'updateSituation', 
								'petId' : data.petId,
							},
							success : function(data) {
							},
							error : function(error) {
								alert("cannot find!");
							}
						}); 
						$.ajax({
							type : "POST",
							async : false,
							contentType : 'application/x-www-form-urlencoded; charset=utf-8',
							url : "/PetHospital/servlet/InHospitalServlet",
							dataType : 'json',
							data : {
								'type' : 'updateInHospital',
								'petId' : data.petId,
								'mark' : '出院',
							},
							success : function(data) {
							},
							error : function(error) {
								alert("加入住院失败!");
							}
						});
						if (msg == 'true') {
							// 删除这一行
							// 关闭弹框
							parent.layer.close(index);
							parent.layer.msg("该宠物已出院", {
								icon : 6
							});
							refreashTable();
						} else {
							parent.layer.msg("出院失败", {
								icon : 5
							});
						}
					}
				});
				
				return false;
			});
		} else if (obj.event === 'addSituation') {
			location.href = "situation.html?inHosid="
				+ data.id;
		}
		

	})
	function refreashTable() {
		table.reload('inHospitalTable', {
			page : {
				curr : 1
			},
			where : { 
					type : 'queryAllInHospital',
					doctorId : curUserId,
					mark : '住院' 
			},

			url : '/PetHospital/servlet/InHospitalServlet',
			method : 'post'
		});
	}
})
