 
layui.use(['element','table','form','jquery'],function(){ 
  var element = layui.element;
  var table = layui.table;
  var form = layui.form;
  var $ = layui.jquery;
  getCurUser();
  $.ajax({
			type : "POST",
			async : false,
			contentType : 'application/x-www-form-urlencoded; charset=utf-8',
			url : "/PetHospital/servlet/PrescribeServlet",
			dataType : 'json',
			data : {
				'types' : 'findPrescriptionByDoctorId', 
				'doctorId' : curUserId
			},
			success : function(data) {
				datas = eval(data); 
				console.log(datas)
				table.render(); 
			},
			error : function(error) {
				alert("cannot find!");
			}
		}); 
  var datas;
  //展示已知数据
  table.render({
    elem: '#regisTable'
    ,id: 'regisTable'
    ,cols: [[ //标题栏
              {field: 'prescriptionCode', title: '药方编号'}
              ,{field: 'userName', title: '主人姓名'}
              ,{field: 'phone', title: '手机号码'}
              ,{field: 'nickname', title: '宠物姓名'}
              ,{field: 'species', title: '宠物类别'}
              ,{field: 'date', title: '就诊时间', width: 160} 
              ,{field: 'totalPrice', title: '价格'} 
              ,{field: 'operate',title: '操作',  width:150, align:'center', toolbar: '#hisRegisTool'}
    ]]
    ,data: datas 
    ,skin: 'line' //表格风格
    ,even: true
    ,page: true //是否显示分页
    ,limits: [5, 7, 10]
    ,limit: 5 //每页默认显示的数量
    ,response: {
    	statusName: 'code' //数据状态的字段名称，默认：code
    	, statusCode: 0 //成功的状态码，默认：0
    	, msgName: 'msg' //状态信息的字段名称，默认：msg
    	, countName: 'count' //数据总数的字段名称，默认：count
    	, dataName: 'data' //数据列表的字段名称，默认：data
    	} 
  }); 
  
  table.on('tool(demo)',function(obj){
	  var data = obj.data;
	  location.href="prescribeInfo.html?prescriptionCode="+data.prescriptionCode;
 
  })
  var active =
  {
      reload: function () {
          var selContent = $('#selContent').val();//获取输入框的值
          var selItem = $("#select").val();
          //执行重载
          table.reload('regisTable',
              {
                  page:
                      {
                          curr: 1 //重新从第 1 页开始
                      }
            , where: { types:'selectPrescription',doctorId : curUserId,selContent: selContent,selItem: selItem}//这里传参  向后台
            , url: '/PetHospital/servlet/PrescribeServlet'//后台做模糊搜索接口路径
            , method: 'post'
              });
      }
  };
  
  $('#selectRe').on('click', function (){
       var type = $(this).data('type');
       active[type] ? active[type].call(this) : '';
  });
  
 })
 