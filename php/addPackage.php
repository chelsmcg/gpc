<?php

	include_once "db/dbConnect.php";


	if(!empty($_GET['vendor']) && !empty($_GET['appId']) && !empty($_GET['appName']) && !empty($_GET['appVersion']) && !empty($_GET['revision'])){
		

		$appId = $_GET['appId'];
		$vendor = $_GET['vendor'];
		$appName = $_GET['appName'];
		$appVersion = $_GET['appVersion'];
		$revision = $_GET['revision'];

		$OS = !empty($_GET['OS']) ? $_GET['pType'] : null;
		$pType = !empty($_GET['pType']) ? $_GET['pType'] : null;
		$priority = !empty($_GET['priority']) ? $_GET['pType'] : null;
		$comments = !empty($_GET['comments']) ? $_GET['pType'] : null;

		$category = 'discovery';
		$status = 'new';
		$added = date('Y-m-d H:i:s');
		$packageAdded = addPackage($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added);
		
		format_response($packageAdded);
	}

	function addPackage($appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments, $category, $status, $added){
		global $mysqli;

		$sql = "INSERT INTO packages(appID, vendor, name, version, revision, operatingSystem, type, priority, comments, category, status, added) 
				VALUES('$appId', '$vendor', '$appName', '$appVersion', '$revision', '$OS', '$pType', '$priority', '$comments', '$category', '$status', '$added')";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			return true;
		}

	}


	function format_response($success, $data=null, $message=null){

		$response = array(
				'success' => $success,
				'data' => $data,
				'message' => $message
			);
		send_response($response);
	}

	// gp.dev/php/addPackage.php?vendor=checlc&appId=69&appName=funz&appVersion=3&revision=2.0

	/**
	* Sends the response.
	*/
	function send_response($response) {
		if ( !empty($_GET['callback']) ) {
			echo $_GET['callback'] . '(' . json_encode($response) . ')';
		}
		else {
			echo json_encode($response);
		}
	}
