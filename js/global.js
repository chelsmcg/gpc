var Global = {

	user: null,

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
	}
	
};

$(function(){
	Global.init();
});