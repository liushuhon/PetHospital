layui.use([ 'element', 'carousel', 'layer', 'jquery' ], function() {
	var element = layui.element, carousel = layui.carousel, layer = layui.layer, $ = layui.jquery;
	// 建造实例
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
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
    	infos +=   "<div class='layui-card'>"+
							"<div class='layui-card-header' onclick='popPetAdopt("+curr.id+")'>"+
								"<img alt='' src='"+curr.photo+"'>"+
							"</div>"+
							"<div class='layui-card-body'>"+
								"<span class='purple text-center'><h3>"+curr.nickname+"</h3></span> <a"+
									"href='javascript:;' onclick='adopt("+curr.adoptPetCode+")'>我想领养</a>"+
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
								+"<img id='popImg'"
								+	"style='width: 100%; height: 100%; margin-left: 12px; border-radius: 10px;'>"
							+"</div>"
							+"<div class='layui-col-md7'>"
								+"<span class='gray block margin-bottom-10'><h1 id='nickname'>"+currPet.nickname+" </h1></span> <span"
								+	"class='gray block margin-bottom-10' id='gender'> </span> <span"
									+"class='gray block margin-bottom-10' id='age'> </span> <span"
									+"class='gray block margin-bottom-10' id='weight'> </span> <span"
									+"class='gray block margin-bottom-10' id='color'> </span> <span"
									+"class='gray block margin-bottom-10' id='species'> </span> <span"
									+"class='gray block margin-bottom-10' id='sterilization'> </span> <span"
									+"class='gray block margin-bottom-10' id='immunity'> </span>"
							+"</div>"
						+"</div>"
					+"</div>"	
	 	  ,area: ['50%', '70%'] 
	 	  ,success : function(layero, index) { 
			$("#nickname").val(currPet.nickname);
			$("#gender").html(currPet.nickname);
//			layero.find("#gender")[0].outerText=currPet.gender;
//			layero.find("#age")[0].outerText=currPet.age;
//			layero.find("#weight")[0].outerText=currPet.weight;
//			layero.find("#species")[0].outerText=currPet.species;
//			layero.find("#color")[0].outerText=currPet.color;
//			layero.find("#sterilization")[0].outerText=currPet.sterilization;
//			layero.find("#immunity")[0].outerText=currPet.immunity;   
		}  
		  ,cancel: function(index){ 
			  layer.close(index);
		  }
		});
	 $('#popUp').hover(function(){
		    $().css("overflow","auto")
		},function(){
		    $().css("overflow","hidden")
		})
}
function adopt() {
	layer.open({
		type:1,
		  title :'宠物资料'
		  ,content:  $('#prompt') 
		  ,btn: ['确定']
	 	  ,area: ['30%', '30%']
		  ,success: function(){
			  
		  }
		  ,yes: function(index){
			  layer.close(index);
		  }
		  ,cancel: function(index){ 
			  layer.close(index);
		  }
	})
}