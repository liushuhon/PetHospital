layui.use([ 'element', 'carousel', 'layer', 'jquery' ], function() {
	var element = layui.element, carousel = layui.carousel, layer = layui.layer, $ = layui.jquery;
	// 建造实例
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
	layer.config({skin: 'my-skin'});
});
var adoptPets = [];
(function(){
	getCurCustomer();
	queryAllAdoptPets();
})();

function queryAllAdoptPets(){
	$.ajax({
		url : "/PetHospital/servlet/AdoptPetServlet",
		type : "POST",
		data : {
			type : 'queryAllPetForUser', 
			state : '待领养'
		},
		success : function(data) {
			adoptPets = eval(data);
			 formateAdoptPets(adoptPets);
		},
		error : function(data) {
			
		}
	});
}

function formateAdoptPets(pets){
	console.log(pets)
    $('#adoptPets').html("");
    var infos = '';
    pets.map(function(curr,index) { 
    	infos +=   "<div class='layui-card layui-col-md4'>"+
							"<div class='layui-card-header' onclick='popPetAdopt("+curr.id+")'>"+
								"<img alt='' src='"+curr.photo+"'>"+
							"</div>"+
							"<div class='layui-card-body'>"+
								"<span class='purple text-center'><h3>"+curr.nickname+"</h3></span> <a "+
									"href='javascript:;' onclick=adopt('"+curr.adoptPetCode+"')>我想领养</a>"+
							"</div>"+
					"</div>";
    }) 
     $('#adoptPets').append(infos);
}
function popPetAdopt(id) {
	var currPet = "";
	adoptPets.map(function(obj){
		if (obj.id === id) {
			currPet = obj; 
		}
	})
	
	 layer.open({
		 type:1
		 ,title :'宠物资料'
		 ,content: "<div id='popUp'>"
						+"<div class='layui-row layui-col-space20 margin-top-10'>"
							+"<div class='layui-col-md5'>"
								+"<img id='popImg' src='"+currPet.photo+"'" 
								+	" style='width: 100%; height: 100%; margin-left: 12px; border-radius: 10px;'>"
							+"</div>"
							+"<div class='layui-col-md7'>"
								+"<span class='gray block margin-bottom-10'><h1 id='nickname'>"+currPet.nickname+" </h1></span> <span "
								+	"class='gray block margin-bottom-10' id='gender'>性别："+currPet.gender+" </span> <span "
									+"class='gray block margin-bottom-10' id='age'>年龄："+currPet.age+" 岁</span> <span "
									+"class='gray block margin-bottom-10' id='weight'>体重："+currPet.weight+" kg</span> <span "
									+"class='gray block margin-bottom-10' id='color'>颜色："+currPet.color+" </span> <span "
									+"class='gray block margin-bottom-10' id='species'>种类："+currPet.species+" </span> <span "
									+"class='gray block margin-bottom-10' id='sterilization'>是否绝育："+currPet.sterilization+" </span> <span "
									+"class='gray block margin-bottom-10' id='immunity'>是否免疫："+currPet.immunity+" </span>"
							+"</div>"
						+"</div>"
					+"</div>"	
	 	  ,area: ['50%', '70%'] 
		  ,cancel: function(index){ 
			  layer.close(index);
		  }
		}); 
}
function adopt(petCode) {
	if (cusId === '') {
		alert('请先登录');
		location.href="login.html";
	} else {
		console.log(petCode)
		layer.open({
			type:1,
			  title :'宠物资料'
			  ,content:  $('#prompt') 
			  ,btn: ['确定']
		 	  ,area: ['30%', '30%']
			  ,success: function(){
				  $.ajax({
						url : "/PetHospital/servlet/AdoptApplicationServlet",
						type : "POST",
						data : {
							type : 'addApplication', 
							userCode : cusId,
							petCode : petCode+""
						},
					});
			  }
			  ,yes: function(index){
				  layer.close(index); 
			  }
			  ,cancel: function(index){ 
				  layer.close(index);
			  }
		})
	}
}