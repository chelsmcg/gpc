var Issues = {
	init: function(){
		Issues.events();
	},

	events: function(){

	},

	getIssueData: function(issueId){
		$.ajax({
  			type: 'post',
  			url: "php/issues.php",
  			data: {
	  				issueId: issueId,
	  				getIssue: true
  				},
  			dataType: 'jsonp',
  			success: function(response) {
  				if(response.success){
  					console.log(response);
  					Issues.populatePage(response.data);
  				}else{
  					console.log('no issues');
  				}
  			}
		});
	},

	populatePage: function(issueData){
		$('#issueSubject').val(issueData.issueSubject);
		$('#issueComment').val(issueData.issueText);
	}
};

$(function(){
	Issues.init();
});