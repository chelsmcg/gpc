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

	$category = !empty($_GET['category']) ? $_GET['category'] : 'all';
	
	if(!empty($_GET['rowId'])){
		$rowId = $_GET['rowId'];
		$packages = getPackage($category, $rowId);

	}else{
		$packages = getPackage($category);
	}

	if(!$packages){

		format_response(false, 'Could not retrieve packages', 'get_failed');

	}else{
		$packageData = array();
		$packageData['userData'] = $_SESSION['user'];
		$packageData['package'] = $packages['package'];

		format_response(true, 'Retrieved packages', $packageData);
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
					 
					$pid = $row['id'];
					$issue = customQuery("SELECT * FROM issues WHERE pid = '$pid' ORDER BY id DESC LIMIT 0, 1");
					$row['issue'] = $issue[0];
					$packages['package'][] = $row;

				}
				return $packages;
			}

			return false;
		}

	}


	
