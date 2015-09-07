var Load = {

	init: function() {
		Load.events();
		Load.dashboard();
	},

	events: function() {
		$('#mainContainer').on('click touch', '#addPackageBtn', Load.addPackage);
		$('body').on('click touch', '.companyLogo', Load.dashboard);
		$('body').on('click touch', '#editIcon', Load.addEditPackage);
		$('body').on('click touch', '#discoveryBtn', Load.discoveryPage);
		
	},

	dashboard: function() {
		$('#mainContainer').load('components.html #dashboard');
	},

	addPackage: function() {
		$('#mainContainer').load('components.html #addPackage');
	},

	addEditPackage: function(){
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('EDIT PACKAGE - PACKAGE NAME');
			$('#pageIcon').text('M');
			$('.formHeader').text('EDIT PACKAGE');
		});
	},

	discoveryPage: function() {
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('DISCOVERY - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('DISCOVERY - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191');

			var $discoverySettings = $('#discoverySettings');

			$('#addPackageForm').append($discoverySettings);
		});
	}
}

$(document).ready(function(){
	Load.init()
});