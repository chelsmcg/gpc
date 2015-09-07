<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	// gp.dev/php/editPackage.php?rowId=7&vendor=checlc&appId=69&appName=funz&appVersion=3&revision=2.0

	
	if(!empty($_GET['rowId'])){
		$rowId = $_GET['rowId'];

	}else{
		format_response(false, 'row id was not given', 'no_id');
		die();
	}
		
	$appId = !empty($_GET['appId']) ? $_GET['appId'] : null;
	$vendor = !empty($_GET['vendor']) ? $_GET['vendor'] : null;
	$appName = !empty($_GET['appName']) ? $_GET['appName'] : null;
	$appVersion = !empty($_GET['appVersion']) ? $_GET['appVersion'] : null;
	$revision = !empty($_GET['revision']) ? $_GET['revision'] : null;
	$OS = !empty($_GET['OS']) ? $_GET['pType'] : null;
	$pType = !empty($_GET['pType']) ? $_GET['pType'] : null;
	$priority = !empty($_GET['priority']) ? $_GET['pType'] : null;
	$comments = !empty($_GET['comments']) ? $_GET['pType'] : null;
	$category = !empty($_GET['category']) ? $_GET['category'] : null;
	$status = !empty($_GET['status']) ? $_GET['status'] : null;

	// $added = date('Y-m-d H:i:s');


	$packageUpdated = editPackage($rowId, $appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status);

	if($packageUpdated){

		format_response($packageUpdated, 'Package updated successfully');

	}else{
		format_response(false, 'The package could not be updated', 'update_fail');
	}

	

	//updates the packages table
	function editPackage($rowId, $appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status){
		global $mysqli;

		$sql = "UPDATE packages
				SET appID='$appId', vendor='$vendor', name='$appName', version='$appVersion', revision='$revision', operatingSystem='$OS', type='$pType', priority='$priority', comments='$comments', category='$category', status='$status'
				WHERE id='$rowId'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if(mysqli_affected_rows($mysqli) != 0){
				return true;
			}

			return false;
		}

	}


	
