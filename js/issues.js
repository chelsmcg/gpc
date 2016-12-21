var Issues = {
	issue: [],

	init: function(){
		Issues.events();
	},

	events: function(){
		$('body').on('click touch', '#displayIssuePage #submitIssueReply', Issues.submitReply);
		$('body').on('click touch', '#issueCancelBtn', Issues.cancelIssue);
	},

	cancelIssue: function() {
		Load.dashboard();
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
  					Issues.populatePage(response.data);
  				}else{
  					console.log('no issues');
  				}
  			}
		});
	},

	populatePage: function(issueData){
		Issues.issue = issueData;
		$('#displayIssuePage #issueSubject').val(issueData.issueSubject);
		$('#displayIssuePage #issueComment').val(issueData.issueText);
		$('#displayIssuePage .issueCreator').text(issueData.fName + ' ' + issueData.lName);
		$('#displayIssuePage .issueDate').text(issueData.date);

		var replyHtml = '';
		// loop to populate replies
		$.each(issueData.replies, function(i, reply){
			
			replyHtml += '<div class="row"> '+
					       '<div id="issueReplyContainer" class="small-12 columns"> '+
					            '<div id="addPackageForm"> '+
					                '<div class="large-3 columns issueDetails" style="padding-bottom:20px;padding-left:50px;"> '+
					                    '<div class="bold">Replied By:</div> '+
					                    '<div class="issueReplyCreator">'+reply.fName+' '+reply.lName+'</div> '+
					                    '<div class="issueReplyDate">'+reply.date+'</div> '+
					                '</div> '+
					                '<div class="large-9 columns" style="padding-right:50px;"> '+
					                    '<div class="formElement"> '+
					                        '<div class="statusLabel"><p>Status:</p></div> '+
					                        '<div class="statusResult"><p>'+reply.status+'</p></div> '+
					                    '</div> '+
					                    '<div class="formElement"> '+
					                        '<label>Message:</label> '+
					                        '<textarea class="issueField display replyComment" readonly required>'+reply.replyText+'</textarea> '+
					                    '</div> '+
					                '</div> '+
					            '</div> '+
					        '</div>  '+
					    '</div> ';
		});

		$('#displayIssuePage #replyToIssue').html(replyHtml);
	},

	

	submitReply: function(){
		var issueId = Issues.issue.id;
		var replyText = $('#displayIssuePage #issueReplyField').val();
		var replyStatus = false;

		if($('#displayIssuePage #Resolved').is(":checked")){
			replyStatus = 'Resolved';
		}else if($('#displayIssuePage #Acknowledged').is(":checked")){
			replyStatus = 'Acknowledged';
		}else if($('#displayIssuePage #onhold').is(":checked")){
			replyStatus = 'On Hold';
		}else if($('#displayIssuePage #details').is(":checked")){
			replyStatus = 'More Details';
		}

		if(replyStatus){
			$.ajax({
	  			type: 'post',
	  			url: "php/issues.php",
	  			data: {
		  				issueId: issueId,
		  				replyText: replyText,
		  				replyStatus: replyStatus,
		  				submitIssueReply: true
	  				},
	  			dataType: 'jsonp',
	  			success: function(response) {
	  				if(response.success){
	  					Issues.getIssueData(issueId);
	  				}else{
	  					console.log('reply failed');
	  				}
	  			}
			});
		}else{
			alert('You Need To Select A Status Bruh!');
		}
	}
};

$(function(){
	Issues.init();
});