var GetPackage = {
	
	packageFilter: {
		page: 1,
		orderBy: 'id',
		sortDirection: 'ASC',
		limit: 5,
		category: 'all'
	},

	init: function() {
		GetPackage.events();
	},

	events: function() {
		$('body').on('click', '#nextPageBtn', GetPackage.nextPage)
		$('body').on('click', '#prevPageBtn', GetPackage.prevPage)
	},

	updatePackageFilter: function(key, value){
		if(key == 'page' && value > 0) {
			GetPackage.packageFilter[key] = value;
		}
	},

	getPackageFilterVal: function(key){
		return GetPackage.packageFilter[key];
	},

	nextPage: function(){
		var currentPage = GetPackage.getPackageFilterVal('page');
		var nextPage = currentPage + 1;
		GetPackage.updatePackageFilter('page', nextPage);
		GetPackage.getPackages(function(response){
			console.log(response);
			if(response.data == 'get_failed'){
				GetPackage.updatePackageFilter('page', currentPage);
			}
		});
	},

	prevPage: function(){
		var currentPage = GetPackage.getPackageFilterVal('page');
		var nextPage = currentPage - 1;
		GetPackage.updatePackageFilter('page', nextPage);
		GetPackage.getPackages(function(response){
			console.log(response);
			if(response.data == 'get_failed'){
				GetPackage.updatePackageFilter('page', currentPage);
			}
		});
	},

	getPackages: function(callback) {

		var data = GetPackage.packageFilter;

		GetPackage.packageAjax(data, function(response){
			if(response.success){
				$('#dashboardTable tbody').empty();
				GetPackage.populateTable(response.data.package);
				GetPackage.userDetails(response.data.userData);
				GetPackage.restrictUser();
			}
			typeof callback == 'function' ? callback(response) : null;
		});
	},

	packageAjax: function(data, callback){
		$.ajax({
			url: "php/getPackage.php",
			data: data,
			dataType: 'jsonp',
			success: function(response) {
				callback(response);
			}
		});
	},

	processPackageData: function(){
		
	},

	restrictUser: function() {
		var hasPermission = false;
		$(".packageRow").each(function() {
			var rowCategory = $(this).find('.packageCategory').text();

		  	if( rowCategory != 'Discovery') {
		  		$(this).find('.edit').addClass('disabled').removeClass('edit');
		  	}

		  	if( rowCategory == 'Quality Assurance' && rowCategory == 'QAT' && rowCategory == 'Completed') {
		  		$(this).find('.edit').addClass('disabled').removeClass('edit');
		  		$(this).find('.issue').addClass('disabled').removeClass('issue');
		  		$(this).find('.documents').addClass('disabled').removeClass('documents');
		  		$(this).find('.source').addClass('disabled').removeClass('source');
		  	}

		  	$.each(Global.user.type, function(index, type){
				if(type == 'Client' || type == 'Packager' || type == 'User Tester' || type == 'Administrator'){
					hasPermission = true;
				}
			});

		  	if(hasPermission) {
		  		$(this).find('.documents').addClass('disabled').removeClass('documents');
		  		$(this).find('.source').addClass('disabled').removeClass('source');
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
		var doc;
		var source;
		var issueId;
		var disableIssue;
		var issueAlert;

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
			issueId = package.issue != null ? package.issue.id : null;
			disableIssue = package.issue == null ? 'disabled' : '';

			if(package.issue && (package.issue.status == null || package.issue.status == 'More Details')){
				issueAlert = 'reply-unread';
			}else if(package.issue && (package.issue.status == 'On Hold' || package.issue.status == 'Acknowledged')){
				issueAlert = 'reply-onhold';
			}else{
				issueAlert = '';
			}

			doc = package.docFile;
			source = package.sourceFile;

			packageName = Global.createPackageName(vendor, appName, appVersion, revision);

			row_html = '<tr class="packageRow" data-rowid="' + id + '"><td class="packageID">'+ appID +'</td><td class="packageName ' + category + 'PageBtn">'+ packageName + '<td class="packageType">'+ packageType + '</td><td class="packagePriority">' + priority + '</td><td class="packageCategory">' + category + '</td><td class="packageStatus">' + status + '</td><td class="tableIcon edit">M</td><td class="tableIcon issue ' + disableIssue + ' ' + issueAlert + '" data-issueid="'+issueId+'">g</td><td class="tableIcon documents"><a  href="' + Global.docLink + '/' + doc + '">H</a></td><td class="tableIcon source" data-source="' + source + '">T</td></tr>';

			$('#dashboardTable tbody').append(row_html);
		}


	},

	userDetails: function(userData) {
		var $this = $(this);
		Global.user = userData;
		var firstName = userData.fName;
		var lastName = userData.lName;

		var userName = firstName + ' ' + lastName;

		$('.userName').text(userName);
	}

}

$(function() {
	GetPackage.init();
});