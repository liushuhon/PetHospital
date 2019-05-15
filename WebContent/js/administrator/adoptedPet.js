layui.use([ 'element', 'table', 'form', 'jquery' ], function() {
	var element = layui.element;
	var table = layui.table;
	var form = layui.form;
	var $ = layui.jquery; 

	// 展示已知数据
	table.render({
		elem : '#petTable',
		id : 'petTable',
		url : '/PetHospital/servlet/AdoptPetServlet',
		where : {
			type : 'queryAllPet',
			state : '已领养'
		},
		method : 'post',
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		request : {
			pageName : 'curr',
			limitName : 'nums'
		},
		cols : [ [ // 标题栏
		{
			field : 'adoptPetCode',
			title : '编号',
			sort : true
		}, {
			field : 'nickname',
			title : '宠物昵称',
		}, {
			field : 'gender',
			title : '雌雄',
		}, {
			field : 'species',
			title : '种类',
		}, {
			field : 'species',
			title : '宠物类别',
		}, {
			field : 'state',
			title : '状态',
		}, {
			field : 'operate',
			title : '操作',
			align : 'center',
			width : 200,
			toolbar : '#petTool'
		} ] ], 
		skin : 'line',
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
			table.reload('petTable', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					type : 'selectPet', 
					selContent : selContent,
					selItem : selItem,
					state : '已领养'
				},// 这里传参 向后台
				url : '/PetHospital/servlet/AdoptPetServlet',// 后台做模糊搜索接口路径
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
			area: ['45%','60%'],
			content: '<div id="pop" >'+
						'<div class="layui-row layui-col-space20 popContent">'+
							'<div class="layui-col-md5">'+
								'<img id="popImg" src="'+pop.photo+'"'+
									'style="width: 70%;height: 70%;margin-left: 12px;border-radius: 10px;">'+
							'</div>'+
							'<div class="layui-col-md7">'+

								'<span class=" block margin-bottom-10" style="font-weight: bold;font-size: 16px;">状态：'+pop.state+'</span> '+
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
			})
		}
	})
	function refreashTable() {
		table.reload('petTable', {
			page : {
				curr : 1
			},
			where : {
				type : 'queryAllPet',
				state : '已领养'
			},
			url : '/PetHospital/servlet/AdoptPetServlet',
			method : 'post'
		});
	}
})
