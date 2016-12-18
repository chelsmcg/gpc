var Login = {

	init: function(){
		Login.events();
	},

	events: function(){
		$('body').on('click touch', '.loginBtn', Login.validateInput);
		$('body').on('keyup', Login.enterLogin);
		$('body').on('click touch', '#forgotPasswordBtn', Login.openForgotPasswordModal);
		$('body').on('click touch', '.forgotPasswordCancelBtn', Login.closeForgotPasswordModal);
	},

	enterLogin: function(e) {
		var key = e.which;
		if(key == 13) {
			Login.validateInput();
		}
	},

	validateInput: function(){
		var username = $('.username').val();
		var password = $('.password').val();
		Login.login(username, password);
	},

	login: function(username, password){
		$.ajax({
  			type: 'post',
  			url: "php/login.php",
  			data: {
  				username: username,
  				password: password
  			},
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success){
  					console.log('load dashboard');
  					Load.dashboard();
  				}else{
  					console.log('login fail');
  				}
  			}
		});
	},

	openForgotPasswordModal: function() {
		$('#forgotPasswordModal').fadeIn();
	},

	closeForgotPasswordModal: function() {
		$('#forgotPasswordModal').fadeOut();
	},
};

$(function(){
	Login.init();
});

