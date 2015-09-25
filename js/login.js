var Login = {

	init: function(){
		Login.events();
	},

	events: function(){
		$('body').on('click touch', '.loginBtn', Login.validateInput);
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
	}
};

$(function(){
	Login.init();
});