layui.use([ 'jquery', 'form', 'layer', 'table' ], function() {
	var layer = layui.layer;
	var form = layui.form;
	var $ = layui.jquery;
	var table = layui.table; 
});
var imgSrc = '';

function uploadPhoto() {
	var input = $("#xFile");
	var file = input[0].files[0];
	var reader = new FileReader();
	reader.onload = function(event) {
		var txt = event.target.result;
		var img = $("#photo");
		imgSrc = txt;
		img.attr('src',imgSrc);
		
	} 
	reader.readAsDataURL( file );
}
