<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	include_once '../email/emailConfig.php';
	include_once '../email/emailFuncs.php';

	$userId = $_SESSION['user']['id'];

	if(!empty($_POST['issueId']) && !empty($_POST['getIssue'])){
		$issueId = $_POST['issueId'];

		// $issue = getSingleRow('issues', 'id', $issueId);
		$issue = customQuery("SELECT i.*, u.fName, u.lName FROM issues i INNER JOIN users u ON i.userId = u.id WHERE i.id = $issueId");
		
		// convert seconds timestamp to date format
		$issue[0]['date'] = date('d/m/y h:ia', $issue[0]['timestamp']);

		$issueReplies = customQuery("SELECT ir.*, u.fName, u.lName FROM issueReplies ir INNER JOIN users u ON ir.userId = u.id WHERE ir.iId = $issueId ORDER BY ir.timestamp DESC");
		
		// convert seconds timestamp to date format
		foreach ($issueReplies as $key => $value) {
			$issueReplies[$key]['date'] = date('d/m/y h:ia', $value['timestamp']);
		}

		$issue[0]['replies'] = $issueReplies;

		if($issue){
			format_response(true, 'issue retrieved', $issue[0]);
		}else{
			format_response(false, 'issue retrieval failed');
		}


	}else if(!empty($_POST['issueId']) && !empty($_POST['replyText']) && !empty($_POST['replyStatus']) && !empty($_POST['submitIssueReply']) && $_POST['submitIssueReply'] == true){
		$issueId = $_POST['issueId'];
		$replyText = $_POST['replyText'];
		$replyStatus = $_POST['replyStatus'];
		$time = time();

		insertRow('issueReplies', 'status, replyText, timestamp, userId, iId', "'$replyStatus', '$replyText', '$time', '$userId', '$issueId'");
		updateField('issues', 'status', $replyStatus, 'id', $issueId);
		format_response(true, 'issue reply added');

	}else{
		format_response(false, 'missing params');
	}