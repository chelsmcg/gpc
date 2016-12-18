<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	require_once '../email/emailConfig.php';
	require_once '../email/emailFuncs.php';


	// gp.dev/php/addPackage.php?vendor=checlc&appId=69&appName=funz&appVersion=3&revision=2.0
	if(!empty($_GET['vendor']) && !empty($_GET['appId']) && !empty($_GET['appName']) && !empty($_GET['appVersion']) && !empty($_GET['revision'])){
		
		$appId = $_GET['appId'];
		$vendor = $_GET['vendor'];
		$appName = $_GET['appName'];
		$appVersion = $_GET['appVersion'];
		$revision = $_GET['revision'];

		$OS = !empty($_GET['OS']) ? $_GET['OS'] : null;
		$pType = !empty($_GET['pType']) ? $_GET['pType'] : null;
		$priority = !empty($_GET['priority']) ? $_GET['priority'] : null;
		$comments = !empty($_GET['comments']) ? $_GET['comments'] : null;

		$category = 'Discovery';
		$status = 'New';
		$added = time();

		//check if input appID already exists in the db
		$exists = checkValue('appID', $appId, 'packages');

		//if appID valid then addes package to db
		if(!$exists){
			$packageAdded = addPackage($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added);
			$emailResult = setupEmail($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added);
			format_response($packageAdded, 'Package added successfully');

		}else{
			format_response(false, 'The appID entered already exists', 'taken_appID');
		}

	}

	//adds a package to the packages table
	function addPackage($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added){
		global $mysqli;
		$userId = $_SESSION['user']['id'];

		$sql = "INSERT INTO packages(appID, vendor, name, version, revision, operatingSystem, type, priority, comments, category, status, added, addedBy) 
				VALUES('$appId', '$vendor', '$appName', '$appVersion', '$revision', '$OS', '$pType', '$priority', '$comments', '$category', '$status', '$added', '$userId')";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			return true;
		}

	}


	function setupEmail($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added){
		$loggedFName = $_SESSION['user']['fName'];
		$loggedLName = $_SESSION['user']['lName'];
		$t = time();
		$date = date("d-m-Y",$t);
		$time = date("h:ia", $t);

		$body = "<p>A package has been added by $loggedFName $loggedLName.</p>".
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


		email($body, 'mark-g-@hotmail.com', 'Global Packaging Center', 'Package Added');//send to package.request@success-sytsems.com.au

	}

	
