var AssignUser = {

	init: function(){
		AssignUser.events();
	},

	events: function(){
		$('#assignList').on('change', '.assigned', AssignUser.selectedAssignee);
		$('body').on('click touch', '.assignUserBtn', AssignUser.updateAssignedUser);
	},

	showAssignList: function() {

		var userType = "";
		console.log(EditPackage.packageData)
		if(EditPackage.packageData.category == 'Discovery'){
			userType = 'Client';
		}else if(EditPackage.packageData.category == 'Packaging'){
			userType = 'Packager';
		}else if(EditPackage.packageData.category == 'Quality Assurance'){
			userType = 'QA Tester';
		}else if(EditPackage.packageData.category == 'UAT'){
			userType = 'User Tester';
		}

		console.log(userType)
		var data = {
				userType: userType
			};

		AssignUser.getAssigneesAjax(data);

		
	},

	selectedAssignee: function() {
		alert('MEOW!');

		var personName = $(this).text();
		var userId = $(this).attr('data-id');

		$('#person').remove();

		var assignedText = '<span id="person" data-id="'+userId+'">ASSIGNED TO:' + ' ' + personName + '</span>';

		$('#assignedToText').append(assignedText);

		$('.updateBtn').show();
	},

	getAssigneesAjax: function(data){
		$.ajax({
  			type: 'post',
  			async: false,
  			url: "php/assignUser.php",
  			data: data,
  			dataType: 'jsonp',
  			success: function(response) {
  				if(response.success){
  					console.log(response.data);
  					AssignUser.renderAssignList(response.data);
  				}else{
  					alert('there is no one in this role to assign');
  				}
  			}
		});
	},

	renderAssignList: function(users){

		$.each(users, function(i, user){
			$('#assignList').append('<option class="assigned" data-id="'+user.id+'">'+user.fName+' '+user.lName+'</option>');
		});
	},

	updateAssignedUser: function(){
		var user_id = $('#assignedToText #person').attr('data-id');
		var dbFieldCategory = "";

			if(EditPackage.packageData.category == 'Discovery'){
				dbFieldCategory = 'Client';
			}else if(EditPackage.packageData.category == 'Packaging'){
				dbFieldCategory = 'assignedPackager';
			}else if(EditPackage.packageData.category == 'Quality Assurance'){
				dbFieldCategory = 'assignedQA';
			}else if(EditPackage.packageData.category == 'UAT'){
				dbFieldCategory = 'assignedUAT';
			}
		var data = {
				assigneeId: user_id,
				packageId: EditPackage.packageData.id,
				dbFieldCategory: dbFieldCategory

			};
		AssignUser.updateAssigneeAjax(data);
	},


	updateAssigneeAjax: function(data){
		$.ajax({
  			type: 'post',
  			async: false,
  			url: "php/assignUser.php",
  			data: data,
  			dataType: 'jsonp',
  			success: function(response) {
  				if(response.success){
  					console.log('nice');
  				}else{
  					alert('lame');
  				}
  			}
		});

		
	}
};

$(function(){
	AssignUser.init();
});