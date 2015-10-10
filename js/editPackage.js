var EditPackage = {

	packageData: [],
	docFile: null,
	sourceFile: null,

	init: function() {
		EditPackage.events();
	},

	events: function() {
		$('body').on('click touch', '#editPackageBtn', EditPackage.editDetails);
		$('body').on('click touch', '.settingsBtnContainer .submit', EditPackage.completedStage);
		$('body').on('click touch', '.settingsBtnContainer #rejectedBtn', EditPackage.rejectPackage);
		$('body').on('change', ':file', EditPackage.fileAdded);
	},

	fileAdded: function(){
		if(typeof this.files[0] != 'undefined'){

			if($(this).hasClass('docs')){
				console.log('docs');
				EditPackage.docFile = this.files[0];

			}else if($(this).hasClass('source')){
				console.log('source');
				EditPackage.sourceFile = this.files[0];
			}

			EditPackage.uploadFile(this.files[0]);
		}
	},

	uploadFile: function(file){
  		
	    var form_data = new FormData();

	    var test = Global.createPackagName(EditPackage.packageData.vendor, EditPackage.packageData.name, EditPackage.packageData.version, EditPackage.packageData.revision); 
	    file.newName = test;
	    form_data.append('file', file);

	    console.log(file);                             
	    $.ajax({
            url: '../php/fileUpload.php', // point to server-side PHP script 
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'post',
            success: function(php_script_response){
                console.log(php_script_response); // display response from the PHP script, if any
            }
	    });
		
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
					AddPackage.editSuccessModal();
				}else{
					AddPackage.editErrorModal();
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
			if(EditPackage.docFile != null && EditPackage.sourceFile != null){
				ajaxData.sourceFile = EditPackage.sourceFile.name;
				ajaxData.documentation = EditPackage.docFile.name;
			}else{
				console.log('missing file');
				return;
			}
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

	rejectPackage: function(){

		var status = $('#status').val();
		var rowID = EditPackage.packageData.id;
		var category = EditPackage.packageData.category;
		var nextCategory = category != 'Packaging' ? 'Packaging' : 'Discovery';

		$.ajax({
			url: "php/editPackage.php",
			data: {
				rowId: rowID,
				status: status,
				currentCategory: category,
				nextCategory: nextCategory,
				type: 'completedStage'
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