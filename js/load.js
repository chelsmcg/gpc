var Load = {

	init: function() {
		Load.events();
		Load.dashboard();
		Load.loadModals();
	},

	events: function() {
		$('#mainContainer').on('click touch', '#addPackageBtn', Load.addPackage);
		$('body').on('click touch', '.companyLogo', Load.dashboard);
		$('body').on('click touch', '#discoveryBtn', Load.discoveryPage);
		
	},

	dashboard: function() {
		$('#mainContainer').load('components.html #dashboard');
		Load.loadModals();
	},

	addPackage: function() {
		$('#mainContainer').load('components.html #addPackage');
		Load.loadModals();
	},

	addEditPackage: function(){
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('EDIT PACKAGE - PACKAGE NAME');
			$('#pageIcon').text('M');
			$('.formHeader').text('EDIT PACKAGE');
		});
		Load.loadModals();
	},

	discoveryPage: function() {
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('DISCOVERY - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('DISCOVERY - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191');

			$('.btnContainer').hide();

			var discoverySettings = '<div id="loadDiscovery"></div>';

			$('#addPackageForm').append(discoverySettings);
			$('#loadDiscovery').load('components.html #discoverySettings');

			$('.mainColumn').css('margin-bottom', '40px');
			
		});
		Load.loadModals();

	},

	loadBottomSnippet: function() {
		var bottomSnippet = '<div id="loadBottomSnippet"></div>';

		$('#addPackageForm').append(bottomSnippet);
		$('#loadBottomSnippet').load('components.html #bottomSnippet');
	}

	loadModals: function() {
		$('#modalContainer').load('components.html #modals');
	}
}

$(document).ready(function(){
	Load.init()
});