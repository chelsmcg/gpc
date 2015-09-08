var GetPackage = {

	init: function() {
		GetPackage.events();
    GetPackage.getAllPackages();
	},

	events: function() {
		$('body').on('click touch', '.edit', GetPackage.packageDetails);
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

      row_html = '<tr data-packageid="#"><td>'+ appID +'</td><td>'+ vendor +'_'+ appName +'_'+ appVersion + '_' + revision + '<td>'+ packageType + '</td><td>' + priority + '</td><td>' + category + '</td><td>' + status + '</td><td class="tableIcon edit">M</td><td class="tableIcon issue">g</td><td class="tableIcon documents">H</td><td class="tableIcon source">T</td></tr>'
    
      $('#dashboardTable tbody').append(row_html);
    }


  },

  packageDetails: function() {
    Load.addEditPackage();

    $.ajax({
        url: "php/getPackage.php",
        dataType: 'jsonp',
        success: function(response) {
          console.log(response);
          var vendor = response.vendor;
          var appID = response.appID;
          var appName = response.name;;
          var appVersion = response.version;
          var opSystem = response.operatingSystem;
          var packageType = response.type;
          var revision = response.revision;
          var priority = response.priority;
          var comments = response.comments;

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

  // openUserDetails: function() {
  //   console.log("yay");
  //   var user_id = $(this).data('userid');
  //   console.log(user_id);
  //   $('.sidePanel').addClass('sidePanelOpen');
  //   $.when(
  //     $.ajax({
  //       url: 'php/ajax_tutorial.php',
  //       type: 'GET',
  //       data: {
  //         getUserDetails: true,
  //         userId: user_id
  //       },
  //       dataType: 'jsonp'
  //     })
  //   ).done(function(response){
  //     console.log(response);
  //     var id = response.userId;
  //     var name = response.name;
  //     var email = response.email;
  //     var age = response.age;

  //     $('#usersName').val(name);
  //     $('#usersEmail').val(email);
  //     $('#usersAge').val(age);

  //     // $('.sidePanel').data('userid', id);
  //     $('.sidePanel').attr('data-userid', id);
  //   });
  // },

}

$(function() {
	GetPackage.init();
});