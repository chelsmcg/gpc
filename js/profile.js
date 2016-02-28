var Profile = {

	init: function() {
		Profile.events();
	},

	events: function() {
		$('body').on('click touch', '#saveProfileBtn', Profile.saveProfile);
		// $('body').on('click touch', '#addUserSuccessBtn', Profile.addUserSuccessBtn);
		// $('body').on('click touch', '#addUserErrorBtn', Profile.addUserErrorBtn);
		// $('body').on('click touch', '#missingFieldsBtn', Profile.missingFieldsBtn);
	},

	getUser: function() {

		$.ajax({
  			url: "php/getUserData.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
          		Profile.populateProfile(response);
  			}
		});
	},

	populateProfile: function(response) {
		var firstName = response.data.fName;
		var lastName = response.data.lName;
		var email = response.data.email;
		var username = response.data.username;
		var roles = response.data.type;

		$('#fName').val(firstName);
		$('#lName').val(lastName);
		$('#email').val(email);
		$('#username').val(username);
		$('#manageRoles .formElement').empty();

		$.each(roles, function(i, role){
			$('#manageRoles .formElement').append('<p class="checkboxText">' + role + '</p>')
		});

	},

	saveProfile: function(){
		console.log('test');
		var email = $('#email').val() != "" ? $('#email').val() : null;
		var firstName = $('#fName').val() != "" ? $('#fName').val() : null;
		var lastName = $('#lName').val() != "" ? $('#lName').val() : null;
		var username = $('#username').val() != "" ? $('#username').val() : null;

		if(email == null || firstName == null || lastName == null || username == null ){
			console.log('missing field');

		}else{
			console.log('test2')
			$.ajax({
  			url: "php/editUser.php",
  			data: {
	  			email: email,
	  			firstName: firstName,
	  			lastName: lastName,
	  			username: username
  			},
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
          		
  			}
		});
		}





		
	}

	
};

$(function() {
	Profile.init();
});

