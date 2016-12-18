var AssignUser = {

	init: function(){
		AssignUser.events();
	},

	events: function(){
		$('body').on('change', '#assignList', AssignUser.selectedAssignee);
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
		var personName = $(this).text();
		var userId = $(this).attr('data-id');

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

		var assignedId = null;
		var selected;

		if(EditPackage.packageData.category == 'Packaging'){
			assignedId = parseInt(EditPackage.packageData.assignedPackager);
		}

		$.each(users, function(i, user){
			selected = assignedId == user.id ? 'selected' : '';
			$('#assignList').append('<option '+selected+' class="assigned" data-id="'+user.id+'" value="'+user.fName+' '+user.lName+'">'+user.fName+' '+user.lName+'</option>');
		});
	},

	updateAssignedUser: function(){
		var user_id = parseInt($('#assignList option:selected').attr('data-id'));
		var dbFieldCategory = "";

		$(this).text('Loading...');

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
				packageId: parseInt(EditPackage.packageData.id),
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
  					$('.updateBtn').fadeOut();
  					$('.assignUserBtn').text('UPDATE');
  				}else{
  					alert('lame');
  					$('.assignUserBtn').text('UPDATE');
  				}
  			}
		});

		
	}
};

$(function(){
	AssignUser.init();
});