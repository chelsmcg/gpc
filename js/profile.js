var Profile = {

	init: function() {
		Profile.events();
	},

	events: function() {
		
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
		var firstName = response.fName;
		var lastName = response.lName;
		var email = response.email;
		var username = response.username;
		var roles = response.type;

		$('#fName').val(firstName);
		$('#lName').val(lastName);
		$('#email').val(email);
		$('#username').val(username);

		// for(i = 0; i < roles.length; i++) {
			
		// }
	}
};

$(function() {
	Profile.init();
});