var Logout = {

	init: function(){
		Logout.events();
	},

	events: function(){
		$('body').on('click touch', '#logoutBtn, #logout', Logout.logout);
	},

	logout: function(){
		$.ajax({
			type: 'get',
  			url: "php/logout.php",
  			dataType: 'jsonp',
  			success: function(response) {
  				console.log(response);
  				if(response.success){
  					console.log('log out success');
  					Load.login();

  				}else{
  					console.log('cant log out');
  				}
  			}
  		});
	}
};

$(function(){
	Logout.init();
});