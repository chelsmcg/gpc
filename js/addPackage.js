var AddPackage = {

	init: function() {
		AddPackage.events();
	},

	events: function() {
    $('body').on('click touch', '#saveNewPackageBtn', AddPackage.saveNewPackage);
    $('body').on('click touch', '#addPackageSuccessBtn', AddPackage.successOKBtn);
    $('body').on('click touch', '#packageAddedErrorBtn', AddPackage.errorOKBtn);
    $('body').on('click touch', '#notUniqueBtn', AddPackage.notUniqueOKBtn);
    $('body').on('click touch', '#editPackageSuccessBtn', AddPackage.editSuccessOKBtn);
		$('body').on('click touch', '#editPackageErrorBtn', AddPackage.editErrorOKBtn);
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
  					AddPackage.successModal();
  				} else {
  					if(response.data == 'taken_appID') {
  						AddPackage.notUniqueModal();
  					} else {
  						AddPackage.errorModal();
  					}
  				}
  			}
		});
	},

  successModal: function() {
    var $modal = $('#packageAddedSuccessModal');

    $modal.fadeIn();
  },

  successOKBtn: function() {
    var $modal = $('#packageAddedSuccessModal');
    $modal.fadeOut();

    Load.dashboard();
  },

  errorModal: function() {
    var $modal = $('#packageAddedErrorModal');

    $modal.fadeIn();
  },

  errorOKBtn: function() {
    var $modal = $('#packageAddedErrorModal');

    $modal.fadeOut();
  },

  notUniqueModal: function() {
    var $modal = $('#notUniqueModal');

    $modal.fadeIn();
  },

  notUniqueOKBtn: function() {
    var $modal = $('#notUniqueModal');

    $modal.fadeOut();
  },

  editSuccessModal: function() {
    var $modal = $('#packageEditSuccessModal');

    $modal.fadeIn();
  },

  editSuccessOKBtn: function() {
    var $modal = $('#packageEditSuccessModal');
    $modal.fadeOut();

    Load.dashboard();
  },

  editErrorModal: function() {
    var $modal = $('#packageEditErrorModal');

    $modal.fadeIn();
  },

  editErrorOKBtn: function() {
    var $modal = $('#packageEditErrorModal');

    $modal.fadeOut();
  },


}

$(function() {
	AddPackage.init();
});