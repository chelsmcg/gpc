var GetPackage = {

	init: function() {
		GetPackage.events();
    GetPackage.getAllPackages();
	},

	events: function() {
		// $('body').on('click touch', '#saveNewPackageBtn', GetPackage.getAllPackages);
	},

	getAllPackages: function() {
		var $this = $(this);
		var vendor;
		var appID;
		var appName;
		var appVersion;
		var opSystem;
		var packageType;
		var revision;
		var priority;
		var comments;

		$.ajax({
  			url: "php/getPackage.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				GetPackage.populateTable(response);
  			}
		});
	},

  populateTable: function(response) {
    var $this = $(this);
    var packages = response.data.package;
    var package;
    var vendor;
    var appID;
    var appName;
    var appVersion;
    var opSystem;
    var packageType;
    var revision;
    var category;
    var status;
    var priority;
    var comments;
    var row_html;

    console.log(packages);

    for(var i = 0; i < packages.length; i++) {
      package = packages[i];
      vendor = package.vendor;
      appID = package.appID;
      appName = package.name;
      appVersion = package.version;
      opSystem = package.operatingSystem;
      packageType = package.type;
      revision = package.revision;
      category = package.category;
      status = package.status;
      priority = package.priority;
      comments = package.comments;

      row_html = '<tr><td>'+ appID +'</td><td>'+ vendor +'_'+ appName +'_'+ appVersion + '_' + revision + '<td>'+ packageType + '</td><td>' + priority + '</td><td>' + category + '</td><td>' + status + '</td><td class="tableIcon edit">M</td><td class="tableIcon issue">g</td><td class="tableIcon documents">H</td><td class="tableIcon source">T</td></tr>'
    
      $('#dashboardTable tbody').append(row_html);
    }


  }

}

$(function() {
	GetPackage.init();
});