var AssignUser = {

	init: function(){
		AssignUser.events();
	},

	events: function(){
		$('body').on('change', '#status', AssignUser.showAssignList);
		$('body').on('click touch', '.assigned', AssignUser.selectedAssignee);
		$('body').on('click touch', '.assignUserBtn', AssignUser.updateAssignedUser);
	},

	showAssignList: function() {

		if($('#status option:selected').val() == 'assignTo'){

			var userType = "";

			if(EditPackage.packageData.category == 'Discovery'){
				userType = 'Client';
			}else if(EditPackage.packageData.category == 'Packaging'){
				userType = 'Packager';
			}else if(EditPackage.packageData.category == 'Quality Assurance'){
				userType = 'QA Tester';
			}else if(EditPackage.packageData.category == 'UAT'){
				userType = 'User Tester';
			}
			var data = {
					userType: userType
				};

			AssignUser.getAssigneesAjax(data);
		}

		
	},

	selectedAssignee: function() {

		$('#assignList').hide();

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
  					alert('there is no one in this role to assign :S');
  				}
  			}
		});
	},

	renderAssignList: function(users){
		// <li class="assigned">Chelsea</li>
		var selected = $('#status option:selected').val();
		$('#assignList .list ul li').remove();
		$.each(users, function(i, user){
			$('#assignList .list ul').append('<li class="assigned" data-id="'+user.id+'">'+user.fName+' '+user.lName+'</li>');
		});

		if(selected == 'assignTo') {
			$('#assignList').show();
			$('.updateBtn').hide();
		} else {
			$('#assignList').hide();
		}
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