var AddUser = {

	init: function() {
		AddUser.events();
	},

	events: function() {
		$('body').on('click touch', '#saveNewUserBtn', AddUser.addNewUser);
		$('body').on('click touch', '#addUserSuccessBtn', AddUser.addUserSuccessBtn);
		$('body').on('click touch', '#addUserErrorBtn', AddUser.addUserErrorBtn);
		$('body').on('click touch', '#missingFieldsBtn', AddUser.missingFieldsBtn);
	},

	

	

	addNewUser: function() {
		Global.showLoader();

		var fname = $('#fName').val();
		var lname = $('#lName').val();
		var email = $('#email').val();
		var username = $('#username').val();
		var password = $('#password').val();
		var type = new Array();
		var hasRole = false;


		//loops through check boxes
		$('.newRole').each(function(){

			//if checkbox checked then adds name value to type array
			if($(this).is(':checked')){
				hasRole = true; //when hasRole is made true it means at least 1 check box was checked
				type.push($(this).attr('name'));
			}
		});

		//if at least one checkbox was checked can ajax else if no boxes were checked cannot continue to ajax 
		if(hasRole && fname != '' && lname != '' && email != '' && username != '' && password != ''){
			console.log(type);

			$.ajax({
				url: "php/addUser.php",
				data: {
					firstName: fname,
					lastName: lname,
					username: username,
					password: password,
					email: email,
					type: type
				},
				dataType: 'jsonp',
				success: function(response) {
					Global.hideLoader();
					if(response.success) {
	  					AddUser.addUserSuccessModal();
	  				} else {
	  					AddUser.addUserErrorModal();
	  				}
				}
			})
		}else{
			AddUser.missingFieldsModal();
		}
	},

	addUserSuccessModal: function() {
		var $modal = $('#addUserSuccessModal');

    	$modal.fadeIn();
	},

	addUserSuccessBtn: function() {
		var $modal = $('#addUserSuccessModal');

    	$modal.fadeOut();
    	Load.dashboard();
	},

	addUserErrorModal: function() {
		var $modal = $('#addUserErrorModal');

    	$modal.fadeIn();
	},

	addUserErrorBtn: function() {
		var $modal = $('#addUserErrorModal');

    	$modal.fadeOut();
	},

	missingFieldsModal: function() {
		var $modal = $('#missingFieldsModal');

    	$modal.fadeIn();
	},

	missingFieldsBtn: function() {
		var $modal = $('#missingFieldsModal');

    	$modal.fadeOut();
	}
};

$(function() {
	AddUser.init();
});

