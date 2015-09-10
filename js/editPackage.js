var EditPackage = {

	init: function() {
		EditPackage.events();
	},

	events: function() {
    $('body').on('click touch', '.edit', EditPackage.packageDetails);
	},

  packageDetails: function() {
    console.log('yay');
    Load.addEditPackage();

    var rowID = $(this).parent().attr('data-rowid');

    $.ajax({
        url: "php/getPackage.php",
        data: {
          rowId: rowID
        },
        dataType: 'jsonp',
        success: function(response) {
          console.log(response);
          var vendor = response.data.package[0].vendor;
          var appID = response.data.package[0].appID;
          var appName = response.data.package[0].name;;
          var appVersion = response.data.package[0].version;
          var opSystem = response.data.package[0].operatingSystem;
          var packageType = response.data.package[0].type;
          var revision = response.data.package[0].revision;
          var priority = response.data.package[0].priority;
          var comments = response.data.package[0].comments;
          var packageName = Global.createPackagName(vendor, appName, appVersion, revision);

          $('.dashTitle').text('EDIT PACKAGE - ' + packageName);

          $('#vendor').val(vendor);
          $('#appName').val(appName);
          $('#appVersion').val(appVersion);
          $('#opSystem').val(opSystem);
          $('#packageType').val(packageType);
          $('#revision').val(revision);
          $('#priority').val(priority);
          $('#comments').val(comments);

        }
    });
  }

}

$(function() {
	EditPackage.init();
});