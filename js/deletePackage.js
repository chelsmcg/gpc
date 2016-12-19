var DeletePackage = {
	init: function(){
		DeletePackage.events();
	},

	events: function(){
		$('body').on('click touch', '#deleteBtn', DeletePackage.deletePackage);
	},

	deletePackage: function(){
		Global.showLoader();

		$.ajax({
  			url: "php/deletePackage.php",
  			data: {
  				packageId: EditPackage.packageData.id
  			},
  			dataType: 'jsonp',
  			success: function(response) {
          		Global.hideLoader();
  				if(response.success) {
  					Load.dashboard();
  				} else {
  					alert('An unexpected error occured. Please try again.');
  				}
  			}
		});
	}
};

$(function(){
	DeletePackage.init();
});	