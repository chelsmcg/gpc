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


	//checks type exists. determine what type of edit is being requested
	if(!empty($_GET['type'])){

		//for a general edit
		if($_GET['type'] == 'edit'){
	
			
				
			$appId = !empty($_GET['appId']) ? $_GET['appId'] : null;
			$vendor = !empty($_GET['vendor']) ? $_GET['vendor'] : null;
			$appName = !empty($_GET['appName']) ? $_GET['appName'] : null;
			$appVersion = !empty($_GET['appVersion']) ? $_GET['appVersion'] : null;
			$revision = !empty($_GET['revision']) ? $_GET['revision'] : null;
			$OS = !empty($_GET['OS']) ? $_GET['OS'] : null;
			$pType = !empty($_GET['pType']) ? $_GET['pType'] : null;
			$priority = !empty($_GET['priority']) ? $_GET['priority'] : null;
			$comments = !empty($_GET['comments']) ? $_GET['comments'] : null;

			// $added = date('Y-m-d H:i:s');


			$packageUpdated = editPackage($rowId, $appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments);

			if($packageUpdated){

				format_response($packageUpdated, 'Package updated successfully');

			}else{
				format_response(false, 'The package could not be updated', 'update_fail');
			}



		//for edit of package ofter a stage is complated
		}else if($_GET['type'] == 'completedStage'){
			
			//checks all params exist
			if(!empty($_GET['status']) && !empty($_GET['currentCategory']) && !empty($_GET['nextCategory'])){
				
				$status = $_GET['status'];
				$currentCategory = $_GET['currentCategory'];
				$nextCategory = $_GET['nextCategory'];

				//checks to see if on discovery categpry
				if($currentCategory != 'Discovery'){

					$stageUpdated = updateStage($rowId, $status, $nextCategory);

				
				//when category is on discover then must also add files to package
				}else if($currentCategory == 'Discovery' && !empty($_GET['sourceFile']) && !empty($_GET['documentation'])){

					$sourceFile = $_GET['sourceFile'];
					$documentation = $_GET['documentation'];

					$stageUpdated = updateStage($rowId, $status, $nextCategory);

					if($stageUpdated){

						$filesUpdated = updateFiles($rowId, $sourceFile, $documentation);

						if($filesUpdated){
							format_response(true, 'stage and files added successfully');
						}

					}else{
						format_response(false, 'The stage could not be updated', 'stageChange_fail');
					}
				}
			}else{
				format_response(false, 'missing params', 'stage_fail');
			}
		}

	}else{
		format_response(false, 'No type param recieved', 'update_fail');
	}

	

	//updates the packages table
	function editPackage($rowId, $appId, $vendor, $appName, $appVersion, $revision, $OS, $pType, $priority, $comments){
		global $mysqli;

		$sql = "UPDATE packages
				SET appID='$appId', vendor='$vendor', name='$appName', version='$appVersion', revision='$revision', operatingSystem='$OS', type='$pType', priority='$priority', comments='$comments'
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

	//updates category aand status
	function  updateStage($rowId, $status, $nextCategory){
		global $mysqli;

		$sql = "UPDATE packages
				SET status='$status', category='$nextCategory'
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

	//updates files
	function  updateFiles($rowId, $sourceFile, $documentation){
		global $mysqli;

		$sql = "UPDATE packages
				SET docFile='$documentation', SourceFile='$sourceFile'
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


	
