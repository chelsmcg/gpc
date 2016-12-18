<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	require_once '../email/emailConfig.php';
	require_once '../email/emailFuncs.php';

	// gets user of specific type/role
	if(!empty($_POST['userType'])){
		$type = $_POST['userType'];
		$sql = "SELECT u.fName, u.lName, u.id FROM users u INNER JOIN roles r ON u.id = r.id WHERE type = '$type'";
		
		$users = customQuery($sql);

		if($users){
			format_response(true, 'missing params', $users);

		}else{
			format_response(false, 'no users of type '.$type.' found');
		}

	// assignes specified user to a package
	}else if(!empty($_POST['assigneeId']) && !empty($_POST['packageId']) && !empty($_POST['dbFieldCategory'])){

		$userId = $_POST['assigneeId'];
		$updateField = $_POST['dbFieldCategory'];
		$packageId = $_POST['packageId'];

		$result = updateField('packages', $updateField, $userId, 'id', $packageId);

		if($result){
			$result = sendAssignedEmail($userId, $packageId, $updateField);

			if(!$result){
				error_log('user assigned but there were email issues.');
			}

			format_response(true, 'assignee updated');

		}else{
			format_response(false, 'could not update assignee');
		}

	}else{
		format_response(false, 'missing params');
	}


	function sendAssignedEmail($userId, $packageId, $updateField){

		// get assignee details
		$assigneeDets = getSingleRow('users', 'id', $userId);
		
		if($assigneeDets){
			$assigneeFName = $assigneeDets['fName'];
			$assigneeLName = $assigneeDets['lName'];
			$assigneeEmail = $assigneeDets['email'];
			
			// get package details
			$packageDets = getSingleRow('packages', 'id', $packageId);

			if($packageDets){
				$appId = $packageDets['appID'];
				$vendor = $packageDets['vendor'];
				$appName = $packageDets['name'];
				$appVersion = $packageDets['version'];
				$revision = $packageDets['revision'];
				$OS = $packageDets['operatingSystem'];
				$pType = $packageDets['type'];
				$priority = $packageDets['priority'];
				$comments = $packageDets['comments'];
				$category = $packageDets['category'];
				$status = $packageDets['status'];
				$t = time();
				$date = date("d-m-Y",$t);
				$time = date("h:ia", $t);

				// get assigners details
				$loggedFName = $_SESSION['user']['fName'];
				$loggedLName = $_SESSION['user']['lName'];

				$body = "<p>Hi $assigneeFName $assigneeLName,</p>".
				$body = "<p>A package has been assigned to you by $loggedFName $loggedLName with the following details:</p>".
						"<p>Added Date: $date</p>".
						"<p>Added Time: $time</p>".
						"<p>App Id: $appId</p>".
						"<p>Vendor: $vendor</p>".
						"<p>App Name: $appName</p>".
						"<p>App Version: $appVersion</p>".
						"<p>Revision: $revision</p>".
						"<p>OS: $OS</p>".
						"<p>Type: $pType</p>".
						"<p>Priority: $priority</p>".
						"<p>Comments: $comments</p>".
						"<p>Category: $category</p>".
						"<p>Status: $status</p>";

				email($body, $assigneeEmail, 'Global Packaging Center', 'Package Assigned');

				return true;
			}	
		}
		return false;
	}





