var GetSource ={
	init: function(){
		GetSource.events();
	},

	events: function(){
		$('body').on('click touch', '.packageRow .source', GetSource.getSource);
	},

	getSource: function(){
		var fileName = $(this).attr('data-source');
		var link = Global.sourecLink + '/' + fileName;
		window.location.href = link;
	}
};

$(function(){
	GetSource.init();
})