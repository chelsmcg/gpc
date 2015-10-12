var Profile = {

	init: function() {
		Profile.events();
	},

	events: function() {
		$('body').on('click touch', '#saveNewUserBtn', Profile.addNewUser);
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
	},

	addNewUser: function() {
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
		if(hasRole){
			console.log(type);

			$.ajax({
				url: "php/addUser.php",
				data: {
					firstName: fname,
					lastName: lname,
					username: username,
					encPassword: password,
					email: email
				},
				dataType: 'jsonp',
				success: function(response) {
					console.log('SUCCESS!!!!!!!!');
					console.log(response);
				}
			})
		}else{
			console.log("No boxes were checked!!!!");
		}
	}
};

$(function() {
	Profile.init();
});

