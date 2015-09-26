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
		var firstName = response.data.fName;
		var lastName = response.data.lName;
		var email = response.data.email;
		var username = response.data.username;
		var roles = response.data.type;

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