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

	showLoader: function() {
		$('#loader').show();

		$('#loadContainer').css("overflow", "hidden");
	},

	hideLoader: function() {
		$('#loader').hide();

		$('#loadContainer').css("overflow", "auto");
	},

	checkLogin: function(callback){
		$.ajax({
  			type: 'get',
  			url: "php/checkLoggedIn.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				callback(response);
  			}
		});
	},

	getUserDetails: function(callback){
		$.ajax({
  			type: 'get',
  			url: "php/getUserData.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				callback(response);
  			}
		});
	},
	
};

$(function(){
	Global.init();
});