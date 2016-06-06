var ChangePassword = {
	init: function(){
		ChangePassword.events();
	},

	events: function(){
		$('body').on('click', '#changePasswordModal #changesPasswordBtn', ChangePassword.forcePasswordChange)
	},

	forcePasswordChange: function(){

		var password = $(this).closest('#changePasswordModal').find('#passwordInput').val();
		var validPassword = ChangePassword.validatedPassword(password);

		$('#changePasswordModal .errorMsg').hide();

		if(validPassword){
			ChangePassword.changePasswordAjax(password, Global.user.id, function(response){
				if(response.success){
					$('#changePasswordModal').fadeOut();
					Global.user.hasLoggedIn == 1;
				}else{
					$('#changePasswordModal .errorMsg').fadeIn();
				}
			});
		}else{
			$('#changePasswordModal .errorMsg').fadeIn();

		}
	},


	validatedPassword: function(password){
		if(password.length < 6){
			// invalid
			return false;
		}else{
			// valid
			return true;
		}
	},



	changePasswordAjax: function(password, userId, callback){
		$.ajax({
  			type: 'get',
  			url: "php/changePassword.php",
  			data: {
  				password: password,
  				userId: userId
  			},	
  			dataType: 'jsonp',
  			success: function(response) {
  				callback(response);
  			}
		});
	}
}; 

$(function(){
	ChangePassword.init();
});