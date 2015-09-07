var AddPackage = {

	init: function() {
		AddPackage.events();
	},

	events: function() {
		$('body').on('click touch', '#saveNewPackageBtn', AddPackage.saveNewPackage);
	},

	saveNewPackage: function() {
		var $this = $(this);
		var vendor = $('#vendor').val();
		var appID = $('#appID').val();
		var appName = $('#appName').val();
		var appVersion = $('#appVersion').val();
		var opSystem = $('#opSystem').val();
		var packageType = $('#packageType').val();
		var revision = $('#revision').val();
		var priority = $('#priority').val();
		var comments = $('#comments').val();

		$.ajax({
  			url: "php/addPackage.php",
  			data: {
  				appId: appID,
  				vendor: vendor,
  				appName: appName,
  				appVersion: appVersion,
  				revision: revision,
  				OS: opSystem,
  				pType: packageType,
  				priority: priority,
  				comments: comments
  			},
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success) {
  					alert('yay');
  				} else {
  					if(response.data == 'taken_appID') {
  						alert('Taken App ID');
  					} else {
  						alert('Unexpected Error');
  					}
  				}
  			}
		});
	}


}

$(function() {
	AddPackage.init();
});