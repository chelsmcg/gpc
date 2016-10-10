var Load = {

	init: function() {
		Load.events();
		Load.loadModals();
		Global.checkLogin(function(response){
			response.success ? Load.dashboard() : Load.login();
		});
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
		$('body').on('click touch', '.issue', Load.showSingleIssuePage);
		// $('body').on('click touch', '#rejectedBtn', Load.issuePage);
		
	},

	login: function(callback) {
		$('#loadContainer').load('components.html #loginPage', function(){
			$('#loadContainer').addClass('loginBackground');
			typeof callback == 'function' ? callback() : null;
		});
	},

	dashboard: function(callback) {
		$('#loadContainer').load('components.html #dashboard', function(){
			$('#loadContainer').removeClass('loginBackground');
			
			Graphs.init();
			
			Load.loadModals(function(){

				Global.getUserDetails(function(response){

					console.log(response)
					Global.user = response.success ? response.data : Global.user;

					if(!Global.user.hasLoggedIn){
						$('#changePasswordModal').fadeIn();
					}
				});

				GetPackage.getPackages();
				typeof callback == 'function' ? callback() : null;
			});
		});
		
	},

	addPackage: function(callback) {
		$('#mainContainer').load('components.html #addPackage', function(){
			Load.loadModals(function(){
				typeof callback == 'function' ? callback() : null;
			});
		});
	},

	addEditPackage: function(callback){
		$edit = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			// $('.dashTitle').text('EDIT PACKAGE - PACKAGE NAME');
			$('#pageIcon').text('M');
			$('.formHeader').text('EDIT PACKAGE');
			$('#saveNewPackageBtn').attr('id', 'editPackageBtn');
			var rowID = $edit.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);

			Load.loadModals(function(){
				typeof callback == 'function' ? callback() : null;
			});
		});
	},

	discoveryPage: function() {
		
		var hasPermission = false;
		$discovery = $(this);


		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('DISCOVERY - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('DISCOVERY - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			var discoverySettings = '<div id="loadDiscovery"></div>';

			$('#addPackageForm').append(discoverySettings);

			//this loops through logged in user and get their types - if their type == 'something' they have permissions
			$.each(Global.user.type, function(index, type){
				if(type == 'Client' || type == 'Team Leader' || type == 'Administrator'){
					hasPermission = true;
				}
			});

			if(hasPermission) {
				$('#loadDiscovery').load('components.html #discoverySettings', function(){
					$('.mainColumn').css('margin-bottom', '40px');
				});
			}

			var rowID = $discovery.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);

			Load.loadModals()
		});
	},

	loadBottomSnippet: function() {
		var bottomSnippet = '<div id="loadBottomSnippet"></div>';

		$('#addPackageForm').append(bottomSnippet);
		$('#loadBottomSnippet').load('components.html #bottomSnippet');
	},

	packagingPage: function() {
		var hasPermission = false;
		$packaging = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('PACKAGING - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('PACKAGING - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			//this loops through logged in user and get their types - if their type == 'something' they have permissions
			$.each(Global.user.type, function(index, type){
				if(type == 'Packager' || type == 'Team Leader' || type == 'Administrator'){
					hasPermission = true;
				}
			});

			if(hasPermission) {
				Load.loadBottomSnippet();
			}
			

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $packaging.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
			Load.loadModals();
		});
	},

	qualityPage: function() {
		var hasPermission = false;
		$quality = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('QUALITY ASSURANCE - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('QUALITY ASSURANCE - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			//this loops through logged in user and get their types - if their type == 'something' they have permissions
			$.each(Global.user.type, function(index, type){
				if(type == 'Client' || type == 'QA Tester' || type == 'Administrator'){
					hasPermission = true;
				}
			});

			if(hasPermission) {
				Load.loadBottomSnippet();
			}
			

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $quality.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
			Load.loadModals();
		});
	},

	qatPage: function() {
		var hasPermission = false;
		$quality = $(this);
		$('#mainContainer').load('components.html #addPackage', function(){
			$('.dashTitle').text('QAT - PACKAGE NAME');
			$('#pageIcon').text('T');
			$('.formHeader').text('QAT - PACKAGE DETAILS');

			$('#addPackageForm input, #addPackageForm select, #addPackageForm textarea').css('background', '#919191').prop('disabled', 'true');

			$('.btnContainer').hide();

			//this loops through logged in user and get their types - if their type == 'something' they have permissions
			$.each(Global.user.type, function(index, type){
				if(type == 'User Tester' || type == 'Administrator'){
					hasPermission = true;
				}
			});

			if(hasPermission) {
				Load.loadBottomSnippet();
			}

			$('.mainColumn').css('margin-bottom', '40px');
			var rowID = $quality.parent().attr('data-rowid');
			EditPackage.packageDetails(rowID);
			
			Load.loadModals();
		});
	},

	profilePage: function() {
		$('#mainContainer').load('components.html #profilePage', function() {
			Load.loadModals(function(){
				Profile.getUser();
			});
		});
	},

	issuePage: function() {
		$('#mainContainer').load('components.html #issuePage', function(){
			Load.loadModals();
		});
	},

	showSingleIssuePage: function() {
		if(!$(this).hasClass('disabled')){
			var $this = $(this); 
			$('#mainContainer').load('components.html #displayIssuePage', function(){
				Load.loadModals(function(){
					Issues.getIssueData($this.attr('data-issueid'));
				});
			});
		}
	},

	addUserPage: function() {
		$('#mainContainer').load('components.html #addUser', function(){
			Load.loadModals();
		});
	},

	loadModals: function(callback) {
		$('#modalContainer').load('components.html #modals', function(){
			typeof callback == 'function' ? callback() : null;
		});
	}
}

$(document).ready(function(){
	Load.init()
});