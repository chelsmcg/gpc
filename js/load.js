var Load = {

	init: function() {
		Load.events();
		Load.login();
		Load.loadModals();
	},

	events: function() {
		$('body').on('click touch', '#addPackageBtn', Load.addPackage);
		$('body').on('click touch', '.companyLogo', Load.dashboard);
		$('body').on('click touch', '#discoveryBtn', Load.discoveryPage);
		$('body').on('click touch', '.loginBtn', Load.dashboard);
		$('body').on('click touch', '.DiscoveryPageBtn', Load.discoveryPage);
		$('body').on('click touch', '.edit', Load.addEditPackage);
		
	},

	login: function() {
		$('#loadContainer').load('components.html #loginPage');
	},

	dashboard: function() {
		$('#loadContainer').load('components.html #dashboard');
		GetPackage.getAllPackages();
		Load.loadModals();
	},

	addPackage: function() {
		$('#mainContainer').load('components.html #addPackage');
		Load.loadModals();
	},

	addEditPackage: function(){
		$edit = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			// $('.dashTitle').text('EDIT PACKAGE - PACKAGE NAME');
			$('#pageIcon').text('M');
			$('.formHeader').text('EDIT PACKAGE');
			$('#saveNewPackageBtn').attr('id', 'editPackageBtn');
			var rowID = $edit.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
		});
		Load.loadModals();
	},

	discoveryPage: function() {
		$discover = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('DISCOVERY - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('DISCOVERY - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			var discoverySettings = '<div id="loadDiscovery"></div>';

			$('#addPackageForm').append(discoverySettings);
			$('#loadDiscovery').load('components.html #discoverySettings');

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $discover.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
		});
		Load.loadModals();
		

	},

	loadBottomSnippet: function() {
		var bottomSnippet = '<div id="loadBottomSnippet"></div>';

		$('#addPackageForm').append(bottomSnippet);
		$('#loadBottomSnippet').load('components.html #bottomSnippet');
	},

	loadModals: function() {
		$('#modalContainer').load('components.html #modals');
	}
}

$(document).ready(function(){
	Load.init()
});