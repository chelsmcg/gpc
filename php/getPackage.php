<?php

/*********************************************HOW TO USER******************************************/

//the following values are the parameters needed to be passed through to this script in the data section of the ajax call


/*For all packages
*value: No Params required
*returns: an object of package objects
*test: gp.dev/php/getPackage.php
*/

/*For a specific package
*value: rowId
*returns: an object with one package object
*test: gp.dev/php/getPackage.php?rowId=2
*/

/*For all packages of a specific type
value: *category - ie. "discovery"
*returns: an object of package objects of the set type
*test: gp.dev/php/getPackage.php?category="discovery"
*/

/*For a specific package of specific type
*value: category & rowId
*likely not needed
*test: gp.dev/php/getPackage.php?category="discovery"&rowId=2
*/

// gp.dev/php/getPackage.php

/***************************************************************************************/

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	
	if(!empty($_GET['rowId'])){
		$rowId = $_GET['rowId'];
		$packages = querySinglePackage($rowId);

	}else{
		$orderBy = !empty($_GET['orderBy']) ? $_GET['orderBy']: 'id';
		$page = !empty($_GET['page']) ? intval($_GET['page']): 1;
		$sortDirection = !empty($_GET['sortDirection']) ? $_GET['sortDirection']: 'ASC';
		$limit = !empty($_GET['limit']) ? intval($_GET['limit']): 4;
		$category = !empty($_GET['category']) ? $_GET['category'] : 'all';
		$search = !empty($_GET['search']) ? $_GET['search'] : '';

		$packages = queryMultiplePackages($orderBy, $page, $sortDirection, $limit, $category, $search);
		$packagesStats = getPackageStats($page, $limit);
	}

	if(!$packages){

		format_response(false, 'Could not retrieve packages', 'get_failed');

	}else{
		$packageData = array();
		$packageData['userData'] = $_SESSION['user'];
		$packageData['package'] = $packages['package'];
		if(isset($packagesStats)){
			$packageData['packagesStats'] = $packagesStats;
		}

		format_response(true, 'Retrieved packages', $packageData);
	}

	function getPackageStats($page, $limit){
		$stats = [];
		$numPackages = (int)customQuery("SELECT COUNT(id) as numPackages FROM packages")[0]['numPackages'];
		$stats['currentPage'] = $page;
		$stats['numPackages'] = $numPackages; 
		
		$showFrom = ($page - 1) * $limit + 1;
		$showTo = $showFrom + $limit - 1;
		$showTo = $showTo > $stats['numPackages'] ? $stats['numPackages'] : $showTo;

		$stats['showFrom'] = $showFrom;
		$stats['showTo'] = $showTo;
		$stats['numPages'] = ceil($numPackages / $limit);
		$stats['limit'] = $limit;

		$stats['showingPackages'] = "Showing $showFrom - $showTo of $numPackages";

		return $stats;
	}

	function querySinglePackage($rowId){
		$sql = "SELECT * FROM packages WHERE id = '$rowId'";
		return runPackgeQuery($sql);
	}

	function queryMultiplePackages($orderBy, $page, $sortDirection, $limit, $category, $search){
		$offset = ($page - 1) * $limit;

		// SELECT * FROM packages
		$sql = "SELECT * FROM packages p ";
		// WHERE
		$sql .= $category != 'all' || $search != '' ? "WHERE " : "";
		// Category = 'Discovery'
		$sql .= $category == 'all' ? "" : "category = '$category' ";
		// AND
		$sql .= $category == 'all' || $search == "" && $search == '' ? "" : "AND ";
		// name LIKE %xbox%
		$sql .= $search == '' ? "" : "name LIKE '%$search%' ";
		// ORDER BY id ASC
		$sql .= "ORDER BY p.$orderBy $sortDirection ";
		// LIMIT 0, 4
		$sql .= "LIMIT $offset, $limit ";
		// echo $sql;
		$packages = runPackgeQuery($sql);
		
		return $packages;

	}

	function runPackgeQuery($sql){
		global $mysqli;

		$packages = array();

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if(mysqli_affected_rows($mysqli) != 0){

				while($row = $result->fetch_assoc()){

					$row['priorityAlertLevel'] = setPriorityAlert($row['added'], $row['priority']);
					 
					$pid = $row['id'];
					$issue = customQuery("SELECT * FROM issues WHERE pid = '$pid' ORDER BY id DESC LIMIT 0, 1");
					$row['issue'] = $issue[0];
					$packages['package'][] = $row;

				}
				// return $packages;
			}else{
				$packages['package'] = false;
			}

			// return false;
		}

		return $packages;
		

	}

	function setPriorityAlert($added, $priority){
		$currentTime = time();
		$day = 86400; // seconds in 1 day
		$hour = 3600; // seconds in 1 hour

		$packageAge = $currentTime - $added;


		switch($priority){
			case 'High':
				$timeLimit = $day * 3;
				$warning = $day * 1;
				break;

			case 'Medium':
				$timeLimit = $day * 5;
				$warning = $day * 3;
				break;

			case 'Low':
				$timeLimit = $day * 7;
				$warning = $day * 5;
				break;
		}

		if($packageAge > $warning && $packageAge < $timeLimit){
			$alertLever = 'warning';
		}else if($packageAge >= $timeLimit){
			$alertLever = 'expired';
		}else{
			$alertLever = 'none';
		}

		return $alertLever;
	}












