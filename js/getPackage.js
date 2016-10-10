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
		$('body').on('click', '#packageTableFooter #lastPageBtn, #packageTableFooter #firstPageBtn, #packageTableFooter .pageNums', GetPackage.selectPage)
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
		GetPackage.paginate(nextPage);
	},

	prevPage: function(){
		var currentPage = GetPackage.getPackageFilterVal('page');
		var nextPage = currentPage - 1;
		GetPackage.paginate(nextPage);
	},

	selectPage: function(){
		var pageNum = parseInt($(this).attr('data-page'));
		GetPackage.paginate(pageNum);
	},

	paginate: function(nextPage){
		GetPackage.updatePackageFilter('page', nextPage);
		GetPackage.getPackages(function(response){
			if(response.data == 'get_failed'){
				GetPackage.updatePackageFilter('page', currentPage);
			}
		});
	},

	getPackages: function(callback) {

		var data = GetPackage.packageFilter;

		GetPackage.packageAjax(data, function(response){
			console.log(response)
			if(response.success){
				$('#dashboardTable tbody').empty();
				GetPackage.populateTable(response.data.package);
				GetPackage.userDetails(response.data.userData);
				GetPackage.restrictUser();
				GetPackage.populatePaginationInfo(response.data.packagesStats);
			}
			typeof callback == 'function' ? callback(response) : null;
		});
	},

	populatePaginationInfo: function(stats){
		
		$('.table-pagination #showingPageNumber').text(stats.showFrom + ' - ' + stats.showTo);
		$('.table-pagination #showingAllPages').text(stats.numPackages);
		
		var html = '';
		var activeClass = '';
		var start = 0; 

		if(stats.currentPage <= 3){
			start = 1;
		}else if(stats.numPages - stats.currentPage < 2){
			start = stats.numPages - 4;
		}else{
			start = stats.currentPage - 2;
		}

		var limit = stats.numPages < 5 ? stats.numPages : start + 4;

		for(var i = start; i <= limit; i++){
			activeClass = i == stats.currentPage ? 'active' : '';
			html += '<div id="paginationPages" class="pagination-pages pageNums '+activeClass+'" data-page="'+i+'">'+i+'</div>';	
		}

		$('#packageTableFooter .pageNums').remove();
		$('#packageTableFooter #prevPageBtn').after(html);
		$('#packageTableFooter #lastPageBtn').attr('data-page', stats.numPages);
		$('#packageTableFooter #firstPageBtn').attr('data-page', 1);

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
		var package, vendor, appID, appName, appVersion, opSystem, packageType, revision, category, status, priority, comments, row_html, id, packageName, doc, source, issueId, disableIssue, issueAlert, priorityAlertClass;

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
			
			if(package.priorityAlertLevel == 'warning'){
				priorityAlertClass = 'warning-color';
			}else if(package.priorityAlertLevel == 'expired'){
				priorityAlertClass = 'expired-color';
			}else{
				priorityAlertClass = '';
			}

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

			var docLinkHtml = GetPackage.createDocLinkHtml(doc);

			row_html = '<tr class="packageRow '+priorityAlertClass+'" data-rowid="' + id + '"><td class="packageID" data-th="ID">'+ appID +'</td><td data-th="Package Name" class="packageName ' + category + 'PageBtn">'+ packageName + '</td><td data-th="Type" class="packageType">'+ packageType + '</td><td data-th="Priority" class="packagePriority">' + priority + '</td><td data-th="Category" class="packageCategory">' + category + '</td><td data-th="Status" class="packageStatus">' + status + '</td><td class="tableIcon edit">M</td><td class="tableIcon issue ' + disableIssue + ' ' + issueAlert + '" data-issueid="'+issueId+'">g</td>'+docLinkHtml+'<td class="tableIcon source" data-source="' + source + '">T</td></tr>';

			$('#dashboardTable tbody').append(row_html);
		}


	},

	createDocLinkHtml: function(doc){
		var html = '';

		if(doc){
			html = '<td class="tableIcon documents"><a  href="' + Global.docLink + '/' + doc + '">H</a></td>';
		}else{
			html = '<td class="tableIcon documents">H</td>';
		}

		return html;
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