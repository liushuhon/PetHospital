layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery; 

	// 展示已知数据
	table.render({
		elem : '#appTable',
		id : 'appTable',
		url : '/PetHospital/servlet/AdoptApplicationServlet',
		where : {
			type : 'queryAllApp',
			state : '待处理'
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'adoptPetId',
			title : '宠物编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物昵称',
		}, {
			field : 'userName',
			title : '主人姓名',
		}, {
			field : 'phone',
			title : '联系电话',
		}, {
			field : 'species',
			title : '宠物类别',
		}, {
			field : 'appstate',
			title : '状态',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			width : 200,
			toolbar : '#appTool'
		} ] ], 
		skin : 'line',
		even : true,
		page : true,
		limits : [ 5, 7, 10 ],
		limit : 5,
		response : {
			statusName : 'code',
			statusCode : 0 ,
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
			table.reload('appTable', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectApp', 
					selContent : selContent,
					selItem : selItem,
					state : '待处理'
				},// 这里传参 向后台
				url : '/PetHospital/servlet/AdoptApplicationServlet',// 后台做模糊搜索接口路径
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
		if (obj.event === 'detail') {
		parent.layer.open({
			title: '详细信息',
			type: 1,
			area: ['60%','80%'],
			btn: ['同意', '拒绝'],
			content: '<div id="pop" >'+
						'<div class="layui-row layui-col-space20 popContent">'+
							'<div class="layui-col-md5">'+
								'<img id="popImg" src="'+pop.petPhoto+'"'+
									'style="width: 70%;height: 70%;margin-left: 12px;border-radius: 10px;">'+
							'</div>'+
							'<div class="layui-col-md7">'+
								'<span class=" block margin-bottom-10" style="font-weight: bold;font-size: 16px;">状态：'+pop.state+'</span> '+
								'<span class="bold block margin-bottom-10" >用户编号：'+pop.customerCode+'</span> '+
								'<span class="bold block margin-bottom-10" >用户姓名：'+pop.userName+'</span> '+
								'<span class="bold block margin-bottom-10" >联系方式：'+pop.phone+'</span> '+ 
								'<span class=" block margin-bottom-10" >宠物编号：'+pop.adoptPetCode+'</span> '+
								'<span   class=" block margin-bottom-10">宠物昵称：'+pop.nickname+'</span> '+ 
								'<span   class=" block margin-bottom-10" >年龄：'+pop.age+'岁</span> '+
								'<span  class=" block margin-bottom-10">体重：'+pop.weight+'kg</span>'+
								'<span  class=" block margin-bottom-10">种类：'+pop.species+'</span> '+
								'<span  class=" block margin-bottom-10">颜色：'+pop.color+'</span> '+
								'<span  class=" block margin-bottom-10">是否绝育：'+pop.sterilization+'</span> '+
								'<span  class=" block margin-bottom-10">是否免疫：'+pop.immunity+'</span> '+
							'</div>'+
							
						'</div>'+ 
					'</div>', 
					yes: function(index, layero){
						$.ajax({
							url : '/PetHospital/servlet/AdoptApplicationServlet',
							type : 'POST',
							data : {
								type : 'updateState',
								id : pop.id, 
								masterid : pop.customerId,
								petCode : pop.adoptPetId
							},
							success : function(msg) {
								parent.layer.closeAll();
								refreashTable();
							},
							error : function(msg) {
								parent.layer.closeAll();
								refreashTable() ;
							}
						})
					  }
			})
		}
	})
	function refreashTable() {
		table.reload('appTable', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllApp',
				state : '待处理'
			},
			url : '/PetHospital/servlet/AdoptApplicationServlet',
			method : 'post'
		});
	} 
 
})
