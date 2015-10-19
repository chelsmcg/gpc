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
		$('body').on('click touch', '#nextCategoryBtn', EditPackage.nextCategoryBtn);
		$('body').on('click touch', '#nextCategoryErrorBtn', EditPackage.nextCategoryErrorBtn);
		$('body').on('click touch', '#rejectSuccessBtn', EditPackage.rejectSuccessBtn);
		$('body').on('click touch', '#rejectErrorBtn', EditPackage.rejectErrorBtn);
		$('body').on('change', ':file', EditPackage.fileAdded);
	},

	fileAdded: function(){
		if(typeof this.files[0] != 'undefined'){

			var field = null;

			if($(this).hasClass('docs')){
				console.log('docs');

				if(this.files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || this.files[0].type == 'application/msword'){
					EditPackage.docFile = this.files[0];
					field = 'doc';

				}else{
					EditPackage.docFile = null;
				}

			}else if($(this).hasClass('source')){
				console.log('source');

				if(this.files[0].type == 'application/x-zip-compressed'){
					EditPackage.sourceFile = this.files[0];
					field = 'source';

				}else{
					EditPackage.sourceFile = null;
				}
			}

			EditPackage.uploadFile(this.files[0], field);
		}
	},

	uploadFile: function(file, field){

	    var form_data = new FormData();
	    var newName = Global.createPackageName(EditPackage.packageData.vendor, EditPackage.packageData.name, EditPackage.packageData.version, EditPackage.packageData.revision); 
	    form_data.append('file', file);
                     
	    $.ajax({
            url: '../php/fileUpload.php?newName=' + newName + '&field=' + field,// point to server-side PHP script 
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
				var packageName = Global.createPackageName(vendor, appName, appVersion, revision);

				//puts package data into a global variable
				EditPackage.packageData = response.data.package[0];
				EditPackage.packageData.packageName = packageName;

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

		//if completing discovery page check file uploads
		if(category == 'Discovery'){

			//check doc was added else stop
			if(EditPackage.docFile != null){				
				ajaxData.documentation = EditPackage.docFile.name;

			}else{
				console.log('missing documentation file');
				return;
			}

			//check source added or checkbox ticked else stop
			if(EditPackage.sourceFile != null){
				ajaxData.sourceFile = EditPackage.sourceFile.name;

			}else if($('.checkbox').is(":checked")){
				ajaxData.sourceFile = 'N/A';

			}else{
				console.log('missing source file');
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
					EditPackage.sourceFile = null;
					EditPackage.docFile = null;
					EditPackage.nextCategoryModal();
					
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
					EditPackage.rejectSuccessModal();
				}else{
					EditPackage.rejectErrorModal();
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
	},

	nextCategoryModal: function() {
		var $modal = $('#nextCategoryModal');
		var $name = EditPackage.packageData.packageName;
		var category = EditPackage.packageData.category;
		var nextCategory = EditPackage.nextCategory(category);

		$('.nextCategoryText').text($name + ' ' + 'was moved to' + ' ' + nextCategory + ' ' + 'successfully!');


    	$modal.fadeIn();
	},

	nextCategoryBtn: function() {
		var $modal = $('#nextCategoryModal');

    	$modal.fadeOut();
    	Load.dashboard();
	},

	nextCategoryErrorModal: function() {
		var $modal = $('#nextCategoryModal');
		var $name = EditPackage.packageData.packageName;
		var category = EditPackage.packageData.category;
		var nextCategory = EditPackage.nextCategory(category);

		$('.nextCategoryErrorText').text('There was an error moving' + ' ' + $name + ' ' + 'to' + ' ' + nextCategory + '. ' + 'Please try again.');


    	$modal.fadeIn();
	},

	nextCategoryErrorBtn: function() {
		var $modal = $('#nextCategoryModal');

    	$modal.fadeOut();
	},

	rejectSuccessModal: function() {
		var $modal = $('#rejectSuccessModal');
		var $name = EditPackage.packageData.packageName;
		var category = EditPackage.packageData.category;
		var previousCategory = category != 'Packaging' ? 'Packaging' : 'Discovery';

		$('.rejectSuccessText').text($name + ' ' + 'has been moved back to' + ' ' + previousCategory + '.');


    	$modal.fadeIn();
	},

	rejectSuccessBtn: function() {
		var $modal = $('#rejectSuccessModal');

    	$modal.fadeOut();
    	Load.dashboard();
	},

	rejectErrorModal: function() {
		var $modal = $('#rejectErrorModal');
		var $name = EditPackage.packageData.packageName;
		var category = EditPackage.packageData.category;
		var previousCategory = category != 'Packaging' ? 'Packaging' : 'Discovery';

		$('.rejectErrorText').text('There was an error moving' + $name + ' ' + 'back to' + ' ' + previousCategory + '. Please try again.');


    	$modal.fadeIn();
	},

	rejectErrorBtn: function() {
		var $modal = $('#rejectErrorModal');

    	$modal.fadeOut();
    	Load.dashboard();
	}
}

$(function() {
	EditPackage.init();
});