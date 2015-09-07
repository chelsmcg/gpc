<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	// gp.dev/php/getPackage.php?rowId=7
	$category = !empty($_GET['category']) ? $_GET['category'] : 'all';
	
	if(!empty($_GET['rowId'])){
		$rowId = $_GET['rowId'];
		$packages = getPackage($category, $rowId);

	}else{
		$packages = getPackage($category);
	}
		
	// $appId = !empty($_GET['appId']) ? $_GET['appId'] : null;
	// $vendor = !empty($_GET['vendor']) ? $_GET['vendor'] : null;
	// $appName = !empty($_GET['appName']) ? $_GET['appName'] : null;
	// $appVersion = !empty($_GET['appVersion']) ? $_GET['appVersion'] : null;
	// $revision = !empty($_GET['revision']) ? $_GET['revision'] : null;
	// $OS = !empty($_GET['OS']) ? $_GET['pType'] : null;
	// $pType = !empty($_GET['pType']) ? $_GET['pType'] : null;
	// $priority = !empty($_GET['priority']) ? $_GET['pType'] : null;
	// $comments = !empty($_GET['comments']) ? $_GET['pType'] : null;
	// $category = !empty($_GET['category']) ? $_GET['category'] : null;
	// $status = !empty($_GET['status']) ? $_GET['status'] : null;

	// $added = date('Y-m-d H:i:s');



	if(!$packages){

		format_response(false, 'Could not retrieve packages', 'get_failed');

	}else{
		format_response(true, 'Retrieved packages', $packages);
	}

	

	//updates the packages table
	function getPackage($category, $rowId=null){
		global $mysqli;

		$packages = array();

		$where = "";

		if($category == 'all'){
			$where = "";

		}else{
			$where .= " WHERE category='$category'";
		}

		if($rowId != null){
			$where .= $where == "" ? " WHERE id='$rowId'" : " AND id='$rowId'";
		}


		$sql = "SELECT * FROM packages" . $where;
		// echo $sql;

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if(mysqli_affected_rows($mysqli) != 0){

				while($row = $result->fetch_assoc()){
					$packages['package'][] = $row; 
				}
				return $packages;
			}

			return false;
		}

	}


	
