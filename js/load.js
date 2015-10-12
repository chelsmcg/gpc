var Load = {

	init: function() {
		Load.events();
		Load.loadModals();
		Load.checkLogin();
	},

	events: function() {
		$('body').on('click touch', '#addPackageBtn', Load.addPackage);
		$('body').on('click touch', '.companyLogo', Load.dashboard);
		$('body').on('click touch', '.DiscoveryPageBtn', Load.discoveryPage);
		$('body').on('click touch', '.PackagingPageBtn', Load.packagingPage);
		$('body').on('click touch', '.AssurancePageBtn', Load.qualityPage);
		$('body').on('click touch', '.UATPageBtn', Load.qatPage);
		$('body').on('click touch', '.edit', Load.addEditPackage);
		$('body').on('click touch', '#profileBtn', Load.profilePage);
		$('body').on('click touch', '#addUserBtn', Load.addUserPage);
		
	},

	checkLogin: function() {
		$.ajax({
  			type: 'get',
  			url: "php/checkLoggedIn.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success){
  					console.log('logged in');
  					Load.dashboard();

  				}else{
  					console.log('not logged in');
  					Load.login();
  				}
  			}
		});
	},

	login: function() {
		$('#loadContainer').load('components.html #loginPage');
		$('#loadContainer').addClass('loginBackground');
	},

	dashboard: function() {
		$('#loadContainer').load('components.html #dashboard');
		$('#loadContainer').removeClass('loginBackground');
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
		$discovery = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('DISCOVERY - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('DISCOVERY - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			var discoverySettings = '<div id="loadDiscovery"></div>';

			$('#addPackageForm').append(discoverySettings);

			if(Global.user.type == 'client' || Global.user.type == 'teamleader' || Global.user.type == 'admin') {
				$('#loadDiscovery').load('components.html #discoverySettings');
			}
			

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $discovery.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
		});
		Load.loadModals();
		

	},

	loadBottomSnippet: function() {
		var bottomSnippet = '<div id="loadBottomSnippet"></div>';

		$('#addPackageForm').append(bottomSnippet);
		$('#loadBottomSnippet').load('components.html #bottomSnippet');
	},

	packagingPage: function() {
		$packaging = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('PACKAGING - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('PACKAGING - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			if(Global.user.type == 'packager' || Global.user.type == 'teamleader' || Global.user.type == 'admin') {
				Load.loadBottomSnippet();
			}
			

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $packaging.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
		});
		Load.loadModals();
	},

	qualityPage: function() {
		$quality = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('QUALITY ASSURANCE - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('QUALITY ASSURANCE - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			if(Global.user.type == 'client' || Global.user.type == 'qatester' || Global.user.type == 'admin') {
				Load.loadBottomSnippet();
			}
			

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $quality.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
		});
		Load.loadModals();
	},

	qatPage: function() {
		$quality = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('QAT - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('QAT - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			if(Global.user.type == 'usertester' || Global.user.type == 'admin') {
				Load.loadBottomSnippet();
			}

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $quality.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
		});
		Load.loadModals();
	},

	profilePage: function() {
		$('#mainContainer').load('components.html #profilePage', function() {
			Profile.getUser();
		});
	},

	addUserPage: function() {
		$('#mainContainer').load('components.html #addUser');
	},

	loadModals: function() {
		$('#modalContainer').load('components.html #modals');
	}
}

$(document).ready(function(){
	Load.init()
});