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