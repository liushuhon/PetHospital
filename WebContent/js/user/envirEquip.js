layui.use([ 'element', 'carousel' ], function() {
	var element = layui.element, carousel = layui.carousel;
	// 建造实例
	carousel.render({
		elem : '#test1',
		width : '100%',
		height : '400px',
		arrow : 'always',
	});
});

(function(){
	queryAllFacilitys();
})();
function queryAllFacilitys(){
	$.ajax({
		url : "/PetHospital/servlet/FacilityServlet",
		type : "POST",
		data : {
			type : 'queryAllFaciForUser'
		},
		success : function(data) {
			facilitys = eval(data);
			formateFacilitys(facilitys);
		},
		error : function(data) {
			
		}
	});
}
function formateFacilitys(facilitys){
	console.log(facilitys)
    $('#envirEquip').html("");
    var infos = '';
    facilitys.map(function(curr,index) { 
    	infos +=   "<div class='layui-col-md4'>"+
							"<div>"+
								"<img alt='' src='"+curr.photo+"'>"+
							"</div>"+
							"<div  class='faciName'>"+
								"<span>"+curr.faciName+"</span>"+
							"</div>"+
					"</div>";
    }) 
     $('#envirEquip').append(infos);
}