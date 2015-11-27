<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	require_once '../email/emailConfig.php';
	require_once '../email/emailFuncs.php';

	if(!empty($_POST['userType'])){
		$type = $_POST['userType'];
		$sql = "SELECT u.fName, u.lName, u.id FROM users u INNER JOIN roles r ON u.id = r.id WHERE type = '$type'";
		error_log($sql);
		$users = customQuery($sql);

		if($users){
			format_response(true, 'missing params', $users);

		}else{
			format_response(false, 'no users of type '.$type.' found');
		}

	}else if(!empty($_POST['assigneeId']) && !empty($_POST['packageId']) && !empty($_POST['dbFieldCategory'])){

		$userId = $_POST['assigneeId'];
		$updateField = $_POST['dbFieldCategory'];
		$packageId = $_POST['packageId'];

		$result = updateField('packages', $updateField, $userId, 'id', $packageId);

		if($result){
			format_response(true, 'assignee updated');

		}else{
			format_response(false, 'could not update assignee');
		}

	}else{
		format_response(false, 'missing params');
	}