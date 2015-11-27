var Global = {

	user: null,
	docLink: "docUploads",
	sourecLink : "ftp://ftp2.success-systems.com.au/Source",

	init: function(){
		Global.events();
	},

	events: function(){
		$('body').on('touch click', '#cancelBtn', Load.dashboard)
	},

	createPackageName: function(vendor, appName, appVersion, revision){
		var packageName = vendor + '-' + appName + '-' + appVersion + '-' + revision;
		packageName = packageName.replace(/\s+/g, '');
		return packageName;
	},

	isLoggedIn: function(){
		$.ajax({
  			type: 'get',
  			url: "php/checkLoggedIn.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success){
  					console.log('logged in');
  					return true;

  				}else{
  					console.log('not logged in');
  					return false;
  				}
  			}
		});
	},

	showLoader: function() {
		$('#loader').show();

		$('#loadContainer').css("overflow", "hidden");
	},

	hideLoader: function() {
		$('#loader').hide();

		$('#loadContainer').css("overflow", "auto");
	}
	
};

$(function(){
	Global.init();
});