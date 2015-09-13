var EditPackage = {

	packageData: [],

	init: function() {
		EditPackage.events();
	},

	events: function() {
		$('body').on('click touch', '#editPackageBtn', EditPackage.editDetails);
		$('body').on('click touch', '#completeBtn', EditPackage.completedStage);
	},

	packageDetails: function(rowID) {
		EditPackage.packageData = [];
		$.ajax({
			url: "php/getPackage.php",
			data: {
				rowId: rowID
			},
			dataType: 'jsonp',
			success: function(response) {
				console.log(response);
				EditPackage.packageData = response.data.package[0]
				var vendor = response.data.package[0].vendor;
				var appID = response.data.package[0].appID;
				var appName = response.data.package[0].name;;
				var appVersion = response.data.package[0].version;
				var opSystem = response.data.package[0].operatingSystem;
				var packageType = response.data.package[0].type;
				var revision = response.data.package[0].revision;
				var priority = response.data.package[0].priority;
				var comments = response.data.package[0].comments;
				var status = response.data.package[0].status;
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
				$('#status').val(status);

			}
		});
	},

	editDetails: function(){
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
				rowId: EditPackage.packageData.id,
				appId: appID,
				vendor: vendor,
				appName: appName,
				appVersion: appVersion,
				revision: revision,
				OS: opSystem,
				pType: packageType,
				priority: priority,
				comments: comments,
				type: 'edit'
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
	},

	completedStage: function(){

		var status = $('#status').val();
		var rowID = EditPackage.packageData.id;
		var category = EditPackage.packageData.category;
		var nextCategory = EditPackage.nextCategory(category);
		var ajaxData = {
			rowId: rowID,
			status: status,
			currentCategory: category,
			nextCategory: nextCategory,
			type: 'completedStage'
		};


		if(category == 'Discovery'){
			ajaxData.sourceFile = 'file/path';
			ajaxData.documentation = 'file/path';
		}

		$.ajax({
			url: "php/editPackage.php",
			data: ajaxData,
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
	},

	nextCategory: function(category){

		var nextCategory;
		if(category == 'Discovery'){
			nextCategory = 'Packaging';

		}else if(category == 'Packaging'){
			nextCategory = 'Quality Assurance';

		}else if(category == 'Quality Assurance'){
			nextCategory = 'UAT';

		}else if(category == 'UAT'){
			nextCategory = 'Completed';

		}

		return nextCategory;
	}
}

$(function() {
	EditPackage.init();
});