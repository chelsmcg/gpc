var Effects = {

	init: function() {
		Effects.events();
	},

	events: function() {
		$('body').on('click touch', '#dropdownArrow', Effects.dropdown);
	},

	dropdown: function() {
		$('.dropdown').slideToggle();
	}
}

$(document).ready(function(){
	Effects.init()
});