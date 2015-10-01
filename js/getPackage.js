var GetPackage = {

	init: function() {
		GetPackage.events();
	},

	events: function() {

	},

	getAllPackages: function() {

		$.ajax({
  			url: "php/getPackage.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
          GetPackage.populateTable(response.data.package);
  				GetPackage.userDetails(response.data.userData);
  			}
		});
	},

  populateTable: function(packages) {
    var $this = $(this);
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
    var id;
    var packageName;

    console.log(packages);

    for(var i = 0; i < packages.length; i++) {
      package = packages[i];
      id = package.id;
      vendor = package.vendor.replace(/\s+/g, '');
      appID = package.appID;
      appName = package.name.replace(/\s+/g, '');
      appVersion = package.version.replace(/\s+/g, '');
      opSystem = package.operatingSystem;
      packageType = package.type;
      revision = package.revision.replace(/\s+/g, '');
      category = package.category;
      status = package.status;
      priority = package.priority;
      comments = package.comments;
      packageName = Global.createPackagName(vendor, appName, appVersion, revision);

      if(category == 'Quality Assurance' || category == 'UAT' || category == 'Completed') {
        row_html = '<tr data-rowid="' + id + '"><td>'+ appID +'</td><td class="packageName ' + category + 'PageBtn">'+ packageName + '<td>'+ packageType + '</td><td>' + priority + '</td><td>' + category + '</td><td>' + status + '</td><td class="tableIcon disabled">M</td><td class="tableIcon disabled">g</td><td class="tableIcon disabled">H</td><td class="tableIcon disabled">T</td></tr>';
      }
      else {
        row_html = '<tr data-rowid="' + id + '"><td>'+ appID +'</td><td class="packageName ' + category + 'PageBtn">'+ packageName + '<td>'+ packageType + '</td><td>' + priority + '</td><td>' + category + '</td><td>' + status + '</td><td class="tableIcon edit">M</td><td class="tableIcon issue">g</td><td class="tableIcon documents">H</td><td class="tableIcon source">T</td></tr>';
      }

      $('#dashboardTable tbody').append(row_html);
    }


  },

  userDetails: function(userData) {
    var $this = $(this);
    Global.user = userData;
    console.log(userData);
    var firstName = userData.fName;
    var lastName = userData.lName;

    var userName = firstName + ' ' + lastName;

    $('.userName').text(userName);
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