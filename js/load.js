var Load = {

	init: function() {
		Load.events();
		Load.dashboard();
	},

	events: function() {
		$('#mainContainer').on('click touch', '#addPackageBtn', Load.addPackage);
	},

	dashboard: function() {
		$('#mainContainer').load('components.html #dashboard');
	},

	addPackage: function() {
		$('#mainContainer').load('components.html #addPackage');
	}
}

$(document).ready(function(){
	Load.init()
});