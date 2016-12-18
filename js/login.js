var Login = {

	init: function(){
		Login.events();
	},

	events: function(){
		$('body').on('click touch', '.loginBtn', Login.validateInput);
		$('body').on('keyup', Login.enterLogin);
		$('body').on('click touch', '#forgotPasswordBtn', Login.openForgotPasswordModal);
		$('body').on('click touch', '.forgotPasswordCancelBtn', Login.closeForgotPasswordModal);
		$('body').on('click touch', '#invalidLoginOkBtn', Login.closeInvalidLoginModal);
		$('body').on('click touch', '#forgotPasswordEnterBtn', Login.submitForgotPassword);
		$('body').on('click touch', '#emailSentBtn', Login.closeEmailSentModal);
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
  					Login.openInvalidLoginModal();
  				}
  			}
		});
	},

	openInvalidLoginModal: function() {
		$('#invalidLoginModal').fadeIn();
	},

	closeInvalidLoginModal: function() {
		$('#invalidLoginModal').fadeOut();
	},

	openForgotPasswordModal: function() {
		$('#forgotPasswordModal').fadeIn();
	},

	closeForgotPasswordModal: function() {
		$('#forgotPasswordModal').fadeOut();
		$('#forgotPasswordModal .dialogHeading').text('Please enter your email address');
		$('#forgotPasswordModal .dialogText').text('A generated password will be sent to your email address provided.');
	},

	changeForgotPasswordBtnText: function() {
		$('#forgotPasswordEnterBtn').text('Loading...');
	},

	defaultForgotPasswordBtnText: function() {
		$('#forgotPasswordEnterBtn').text('ENTER');
	},

	errorForgotPassword: function() {
		$('#forgotPasswordModal .dialogHeading').text('Invalid Email Address');
		$('#forgotPasswordModal .dialogText').text('Please try again');
	},

	openEmailSentModal: function() {
		$('#emailSentModal').fadeIn();
	},

	closeEmailSentModal: function() {
		$('#emailSentModal').fadeOut();
	},

	submitForgotPassword: function(){
		Login.changeForgotPasswordBtnText();
		var email = $('#forgotPasswordEmail').val();
		$.ajax({
  			type: 'GET',
  			url: "php/forgotPassword.php",
  			data: {
  				email: email
  			},
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success){
  					Login.closeForgotPasswordModal();
  					Login.openEmailSentModal();
  					Login.defaultForgotPasswordBtnText();
  				}else{
  					console.log('couldnt update');
  					Login.errorForgotPassword();
  					Login.defaultForgotPasswordBtnText();
  				}
  			}
		});
	}
};

$(function(){
	Login.init();
});

