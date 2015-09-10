var EditPackage = {

  rowId: null,

	init: function() {
		EditPackage.events();
	},

	events: function() {
    $('body').on('click touch', '.edit', EditPackage.packageDetails);
    $('body').on('click touch', '#editPackageBtn', EditPackage.editDetails);
	},

  packageDetails: function() {
    console.log('yay');
    Load.addEditPackage();

    EditPackage.rowID = $(this).parent().attr('data-rowid');

    $.ajax({
        url: "php/getPackage.php",
        data: {
          rowId: EditPackage.rowID
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

          $('#appID').val(appID);
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
  },

  editDetails: function(){
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
        url: "php/editPackage.php",
        data: {
          rowId: EditPackage.rowID,
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

          if(response.success){
            AddPackage.successModal();
          }else{
            AddPackage.errorModal();
          }

        }
    });
  }

}

$(function() {
	EditPackage.init();
});