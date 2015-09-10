var Global = {
	init: function(){
		Global.events();
	},

	events: function(){
		$('body').on('touch click', '#cancelBtn', Load.dashboard)
	},

	createPackagName: function(vendor, appName, appVersion, revision){
		var packageName = vendor + '_' + appName + '_' + appVersion + '_' + revision;
		packageName = packageName.replace(/\s+/g, '');
		return packageName;
	}
};

$(function(){
	Global.init();
});