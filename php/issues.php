<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	include_once '../email/emailConfig.php';
	include_once '../email/emailFuncs.php';

	if(!empty($_POST['issueId']) && !empty($_POST['getIssue'])){
		$issueId = $_POST['issueId'];

		// $issue = getSingleRow('issues', 'id', $issueId);
		$issue = customQuery("SELECT i.*, u.fName, u.lName FROM issues i INNER JOIN users u ON i.userId = u.id WHERE i.id = $issueId");

		if($issue){
			format_response(true, 'issue retrieved', $issue[0]);
		}else{
			format_response(false, 'issue retrieval failed');
		}
	}else{
		format_response(false, 'missing params');
	}