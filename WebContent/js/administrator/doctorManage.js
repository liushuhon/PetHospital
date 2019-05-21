layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery;
	getCurUser();

	// 展示已知数据
	var tableIns = table.render({
		elem : '#doctorTable',
		id : 'doctorTable',
		url : '/PetHospital/servlet/DoctorServlet',
		where : {
			type : 'queryAllDoctor'
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'doctorCode',
			title : '编号', 
			sort : true
		}, {
			field : 'doctorName',
			title : '医生姓名', 
		}, {
			field : 'Jobtitle',
			title : '职称', 
		}, {
			field : 'phone',
			title : '联系方式', 
		}, {
			field : 'workTime',
			title : '上班时间', 
		}, {
			field : 'operate',
			title : '操作', 
			align : 'center',
			toolbar : '#doctorTool'
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
			table.reload('doctorTable', {
				page : {
					curr : 1 
				},
				where : {
					type : 'selectDoctor', 
					selContent : selContent,
					selItem : selItem
				},// 这里传参 向后台
				url : '/PetHospital/servlet/DoctorServlet',// 后台做模糊搜索接口路径
				method : 'post'
			});
		}
	};
	$('#selectRe').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	
	$("#addDoctor").on( 'click',
			function() {
				parent.layer.open({
					type : 1,
					title : "新增",
					area : [ '600px', '500px' ],
					content :addCon,

					btn : [ '确定', '取消' ],
					success : function(layero, index) {
						parent.layui.form.render();
						parent.layui.laydate.render({
							elem : '#workStartTime',
							type : 'time',
							min : 0,
							max : 7,
						  });
						parent.layui.laydate.render({
							elem : '#workEndTime',
							type : 'time',
							min : 0,
							max : 7,
						  });
					},
					yes : function(index, layero) {
						let jobTitle = layero.find('#Jobtitle').val();
						let level = layero.find('#level').val();
						let medicalSkill  = layero.find('#skillSelect').val();
						let username = layero.find('#username').val();
						let workTime = layero.find('#workStartTime').val()+"-"+ layero.find('#workEndTime').val();
						let doctorName = layero.find('#doctorName').val();
						let phone = layero.find('#phone').val();
						$.ajax({
							url : '/PetHospital/servlet/DoctorServlet',
							type : 'POST',
							data : {
								type : 'addDoctorByAdmin',
								username : username,
								workTime : workTime,
								level : level,
								jobTitle :jobTitle,
								medicalSkill : medicalSkill,
								doctorName : doctorName,
								phone : phone
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

			});

	
	table.on('tool(doctorTable)', function(obj) {
		var pop = obj.data; 
		if (obj.event === 'detail') {
			parent.layer.open({
				title: '详细信息',
				type: 1,
				area: ['45%','55%'],
				content: '<div id="pop" >'+
							'<div class="layui-row layui-col-space20 popContent">'+
								'<div class="layui-col-md5">'+
									'<img id="popImg" src="'+pop.photo+'"'+
										'style="width: 70%;height: 70%;margin-left: 12px;border-radius: 10px;">'+
								'</div>'+
								'<div class="layui-col-md7">'+
									'<span id="doctorCode" class=" block margin-bottom-10" >编号：'+pop.doctorCode+'</span> '+
									'<span id="userName" class=" block margin-bottom-10" >姓名：'+pop.doctorName+'</span> '+
									'<span id="gender" class=" block margin-bottom-10" >性别：'+pop.gender+'</span> '+
									'<span id="phone" class=" block margin-bottom-10">电话：'+pop.phone+'</span>'+
									'<span id="address" class=" block margin-bottom-10">上班时间：'+pop.workTime+'</span> '+
									'<span id="address" class=" block margin-bottom-10">职务：'+pop.level+'</span> '+
									'<span id="address" class=" block margin-bottom-10">职称：'+pop.Jobtitle+'</span> '+
									'<span id="address" class=" block margin-bottom-10">擅长医术：'+pop.medicalSkill+'</span> '+
								'</div>'+
							'</div>'+ 
						'</div>', 
			});
		} else if (obj.event === 'edit') {
			parent.layer.open({
				title: '编辑',
				type: 1,
				area: ['45%','60%'],
				content:  editCon,
				btn : [ '确定', '取消' ],
				success : function(layero, index) {
					parent.layui.form.render(); 
					parent.layui.laydate.render({
						elem : '#workStartTime',
						type : 'time',
						value : obj.data.workTime.split('-')[0],
						min : 0,
						max : 7,
					  });
					parent.layui.laydate.render({
						elem : '#workEndTime',
						type : 'time',
						value : obj.data.workTime.split('-')[1],
						min : 0,
						max : 7,
					  });
					layero.find('#level').val(obj.data.level);
					layero.find('#Jobtitle').val(obj.data.Jobtitle);
					let medicalSkill = obj.data.medicalSkill;
					var select = 'dd[lay-value=' + medicalSkill + ']';
					parent.$('#skillSelect').siblings("div.layui-form-select").find('dl').find(select).click();
					parent.layui.form.render();
				},
				yes : function(index, layero) {
					let doctorCode = obj.data.doctorCode;
					let jobTitle  = layero.find('#Jobtitle').val();
					let level  = layero.find('#level').val();
					let medicalSkill  = layero.find('#skillSelect').val();
					let workTime  = layero.find('#workStartTime').val()+"-"+ layero.find('#workEndTime').val();
					$.ajax({
						url : '/PetHospital/servlet/DoctorServlet',
						type : 'POST',
						data : {
							type : 'updateDoctorByAdmin',
							doctorCode : doctorCode,
							workTime : workTime,
							level : level,
							jobTitle :jobTitle,
							medicalSkill : medicalSkill
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
	})
	function refreashTable() {
		table.reload('doctorTable', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllDoctor'
			},
			url : '/PetHospital/servlet/DoctorServlet',
			method : 'post'
		});
	}
	var addCon =   '<form class="layui-form layui-from-pane" action="">' +
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">登录名</label>'+
						'<div class="layui-input-inline " >'+
						'<input type="text" class="layui-input input-width" autocomplete="off" id="username">'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">医生姓名</label>'+
						'<div class="layui-input-inline " >'+
						'<input type="text" class="layui-input input-width" autocomplete="off" id="doctorName">'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">联系方式</label>'+
						'<div class="layui-input-inline " >'+
						'<input type="text" class="layui-input input-width" autocomplete="off" id="phone">'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">职务</label>'+
						'<div class="layui-input-inline" >'+
						'<input type="text" class="layui-input input-width" autocomplete="off" id="level">'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">职称</label>'+
						'<div class="layui-input-inline " >'+
						'<input type="text" class="layui-input input-width" autocomplete="off" id="Jobtitle">'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">擅长医术</label>'+
						'<div class="layui-input-inline input-width" >'+
						'<select id="skillSelect" lay-filter="skillSelect" lay-verify="required"  >'+
					    '<option value="骨科专家">骨科专家</option>'+
					    '<option value="牙科专家">牙科专家</option>'+
					    '<option value="眼科专家">眼科专家</option>'+
					    '<option value="外科专家">外科专家</option>'+
					    '<option value="内科专家">内科专家</option>'+
					    '<option value="肿瘤科专家">肿瘤科专家</option>'+
					    '<option value="血液科专家">血液科专家</option>'+
					    '<option value="心脏专家">心脏专家</option>'+
					    '</select>'+
						'</div>'+
						'</div>'+
						'<div class="layui-form-item text-center" style="margin-top:30px">'+
						'<label class="layui-form-label">上班时间</label>'+
						'<div class="layui-input-inline workTimeContent" >'+
						'<input type="text" style="width:55%" class="layui-input" autocomplete="off" id="workStartTime" name="workStartTime">'+' 一  '+
						'<input type="text" style="width:55%" class="layui-input" autocomplete="off" id="workEndTime" name="workEndTime">'+
						'</div>'+
						'</div>'+
					'<form>';
	var editCon = '<form class="layui-form layui-from-pane" action="">' +
					'<div class="layui-form-item text-center" style="margin-top:30px">'+
					'<label class="layui-form-label">上班时间</label>'+
					'<div class="layui-input-inline workTimeContent" >'+
					'<input type="text" style="width:55%" class="layui-input" autocomplete="off" id="workStartTime" name="workStartTime">'+' 一  '+
					'<input type="text" style="width:55%" class="layui-input" autocomplete="off" id="workEndTime" name="workEndTime">'+
					'</div>'+
					'</div>'+'<div class="layui-form-item text-center" style="margin-top:30px">'+
					'<label class="layui-form-label">职务</label>'+
					'<div class="layui-input-inline" >'+
					'<input type="text" class="layui-input input-width" autocomplete="off" id="level">'+
					'</div>'+
					'</div>'+'<div class="layui-form-item text-center" style="margin-top:30px">'+
					'<label class="layui-form-label">职称</label>'+
					'<div class="layui-input-inline " >'+
					'<input type="text" class="layui-input input-width" autocomplete="off" id="Jobtitle">'+
					'</div>'+
					'</div>'+
					'<div class="layui-form-item text-center" style="margin-top:30px">'+
					'<label class="layui-form-label">擅长医术</label>'+
					'<div class="layui-input-inline input-width" >'+
					'<select id="skillSelect" lay-filter="skillSelect" lay-verify="required"  >'+
				    '<option value="骨科专家">骨科专家</option>'+
				    '<option value="牙科专家">牙科专家</option>'+
				    '<option value="眼科专家">眼科专家</option>'+
				    '<option value="外科专家">外科专家</option>'+
				    '<option value="内科专家">内科专家</option>'+
				    '<option value="肿瘤科专家">肿瘤科专家</option>'+
				    '<option value="血液科专家">血液科专家</option>'+
				    '<option value="心脏专家">心脏专家</option>'+
				    '</select>'+
					'</div>'+
					'</div>'+
					'<form>';
})
